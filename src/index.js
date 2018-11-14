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

'use strict';

const {GoogleAuth} = require('google-auth-library');
const got = require('got');
const path = require('path');
const snakeCase = require('lodash.snakecase');

const PAGE_SIZE = 100;

function fetchPage(url, authToken, nextPageToken) {
  const query = {
    pageSize: PAGE_SIZE,
    returnValues: true,
  };

  if (nextPageToken) {
    query.pageToken = nextPageToken;
  }

  return got
    .get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      query,
      json: true,
    })
    .then(response => {
      const variables = response.body.variables || [];
      if (variables.length < PAGE_SIZE) {
        return variables;
      } else {
        return fetchPage(url, authToken, response.body.nextPageToken).then(
          _variables => variables.concat(_variables || [])
        );
      }
    });
}

const debug = (exports.debug = (opts, ...args) => {
  if (opts.debug) {
    console.log('DEBUG:', ...args);
  }
});

/**
 * Retrieves all variables in the given config.
 *
 * @param {string} configName
 * @param {object} [opts]
 * @returns {Promise}
 */
exports.getVariables = (configName, opts = {}) => {
  opts.projectId ||
    (opts.projectId =
      process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT);
  opts.scopes ||
    (opts.scopes = ['https://www.googleapis.com/auth/cloudruntimeconfig']);

  debug(
    opts,
    `Loading config "${configName}" from project "${opts.projectId}".`
  );

  let requestUrl;

  return new Promise((resolve, reject) => {
    const auth = new GoogleAuth(opts);
    auth.getToken((err, authToken) => {
      if (err) {
        reject(err);
        return;
      } else if (!auth.projectId) {
        reject(new Error('Could not determine project ID'));
        return;
      }

      requestUrl = `https://runtimeconfig.googleapis.com/v1beta1/projects/${
        auth.projectId
      }/configs/${configName}/variables`;
      resolve(authToken);
    });
  }).then(authToken => fetchPage(requestUrl, authToken));
};

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
exports.transform = (variables, oldEnv = {}, opts = {}) => {
  const env = {};

  opts.only || (opts.only = []);
  opts.except || (opts.except = []);

  variables.forEach(variable => {
    let value;
    const name = path.parse(variable.name).base.replace('-', '_');
    debug(opts, `Found: ${name}`);

    if (opts.only.length && opts.only.indexOf(name) === -1) {
      debug(opts, `Skipping: ${name}`);
      return;
    } else if (opts.except.length && opts.except.indexOf(name) !== -1) {
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
};

/**
 * Applies the provided raw variables to the given object.
 *
 * @param {object[]} variables
 * @param {object} [env]
 * @param {object} [opts]
 */
exports.apply = (variables, env = process.env, opts = {}) => {
  return Object.assign(env, exports.transform(variables, env, opts));
};

/**
 * Retrieves all variables in the given config and mixes them into the given
 * object.
 *
 * @param {string} configName
 * @param {object} [env]
 * @param {object} [opts]
 * @returns {Promise}
 */
exports.getAndApply = (configName, env = process.env, opts = {}) => {
  return exports
    .getVariables(configName, opts)
    .then(variables => exports.apply(variables, env, opts));
};
