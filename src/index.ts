/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {GoogleAuth, GoogleAuthOptions} from 'google-auth-library';
import * as got from 'got';
import * as path from 'path';
import snakeCase = require('lodash.snakecase');

const PAGE_SIZE = 100;

export interface Variable {
  name: string;
  updateTime: string;
  value: string;
  text?: string;
}

export interface TransformOptions {
  only?: string[];
  except?: string[];
  debug?: boolean;
  override?: boolean;
}

export interface RCLoadEnvOptions extends GoogleAuthOptions {
  debug?: boolean;
}

async function fetchPage(
    url: string, authToken: string,
    nextPageToken?: string): Promise<Variable[]> {
  const query = {
    pageSize: PAGE_SIZE,
    returnValues: true,
    pageToken: nextPageToken
  };

  const response = await got.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    query,
    json: true,
  });
  const variables = response.body.variables || [];
  if (variables.length < PAGE_SIZE) {
    return variables;
  }
  const _variables =
      await fetchPage(url, authToken, response.body.nextPageToken);
  return variables.concat(_variables || []);
}

async function debug(opts: RCLoadEnvOptions, ...args: Array<{}>) {
  if (opts.debug) {
    console.log('DEBUG:', ...args);
  }
}

/**
 * Retrieves all variables in the given config.
 *
 * @param {string} configName
 * @param {object} [opts]
 * @returns {Promise}
 */
export async function getVariables(
    configName: string, opts: RCLoadEnvOptions = {}) {
  opts.scopes =
      opts.scopes || ['https://www.googleapis.com/auth/cloudruntimeconfig'];
  debug(
      opts, `Loading config "${configName}" from project "${opts.projectId}".`);
  const auth = new GoogleAuth(opts);
  const token = await auth.getAccessToken();
  const projectId = await auth.getProjectId();
  const requestUrl = `https://runtimeconfig.googleapis.com/v1beta1/projects/${
      projectId}/configs/${configName}/variables`;
  const result = await fetchPage(requestUrl, token!);
  return result;
}

/**
 * Transforms the given array of raw variables into a simple key-value object.
 *
 * In: [{name:"...",value:"..."}, ...]
 * Out: { VAR1: "...", VAR2: "...", ... }
 *
 * @param {object[]} variables
 * @param {object} [oldEnv]
 * @param {object} [opts]
 */
export function transform(
    variables: Variable[], oldEnv: NodeJS.ProcessEnv = {},
    opts: TransformOptions = {}) {
  const env = {} as NodeJS.ProcessEnv;

  opts.only = opts.only || [];
  opts.except = opts.except || [];

  variables.forEach(variable => {
    let value;
    const name = path.parse(variable.name).base.replace('-', '_');
    debug(opts, `Found: ${name}`);

    if (opts.only!.length && opts.only!.indexOf(name) === -1) {
      debug(opts, `Skipping: ${name}`);
      return;
    } else if (opts.except!.length && opts.except!.indexOf(name) !== -1) {
      debug(opts, `Skipping: ${name}`);
      return;
    }
    debug(opts, `Setting: ${name} and ${snakeCase(name).toUpperCase()}`);

    if (variable.text) {
      value = variable.text;
    } else if (variable.value) {
      value = Buffer.from(variable.value, 'base64').toString();
    }

    const upperName = snakeCase(name).toUpperCase();
    if (opts.override || !oldEnv[name]) {
      env[name] = value;
    }
    if (opts.override || !oldEnv[upperName]) {
      env[upperName] = value;
    }
  });

  return env;
}

/**
 * Applies the provided raw variables to the given object.
 *
 * @param {object[]} variables
 * @param {object} [env]
 * @param {object} [opts]
 */
export function apply(variables: Variable[], env = process.env, opts = {}) {
  return Object.assign(env, transform(variables, env, opts));
}

/**
 * Retrieves all variables in the given config and mixes them into the given
 * object.
 *
 * @param {string} configName
 * @param {object} [env]
 * @param {object} [opts]
 * @returns {Promise}
 */
export async function getAndApply(
    configName: string, env: NodeJS.ProcessEnv = process.env,
    opts: RCLoadEnvOptions = {}) {
  const vars = await getVariables(configName, opts);
  return apply(vars, env, opts);
}
