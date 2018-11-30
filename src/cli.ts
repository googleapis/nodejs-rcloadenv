#!/usr/bin/env node

/**
 * Copyright 2017, Google, Inc.
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

import * as childProcess from 'child_process';
import * as rcloadenv from '.';
import * as yargs from 'yargs';

const USAGE =
    `Wrap execution of the given command with runtime-config variables.
Usage: rcloadenv <configName> [options] -- [args...]`;

const cli = exports.cli =
    yargs.demand(1)
        .usage(USAGE)
        .options({
          debug: {
            alias: 'd',
            description: 'Print debugging information.',
            type: 'boolean'
          },
          except: {
            alias: 'E',
            description:
                'If provided, a list of of runtime-config variables to exclude, otherwise all runtime-config variables will be used.',
            type: 'array'
          },
          only: {
            alias: 'O',
            description:
                'If provided, a list of of runtime-config variables to load, otherwise all runtime-config variables will be used.',
            type: 'array'
          },
          override: {
            alias: 'o',
            default: false,
            description:
                'Determines the behavior of rcloadenv in the case when a runtime-config variable conflicts with a variable already available in the environment. If true, a runtime-config variable will override the existing environment variable, otherwise the existing environment variable will be kept.',
            type: 'boolean'
          },
          projectId: {
            alias: ['project', 'p'],
            description: 'The project where the specified config is located.',
            type: 'string'
          }
        })
        .example(
            `rcloadenv my-config -- bash -c 'echo $MY_VARIABLE_NAME'`,
            `Print a variable's value from the specified config.`)
        .example(
            `rcloadenv my-config --only var1 var2 -- node app.js`,
            `Only load two variables from runtime-config.`)
        .example(
            `rcloadenv my-config --except var1 var2 -- node app.js`,
            `Load all but two variables from runtime-config.`)
        .example(
            `rcloadenv my-config --debug -- node app.js`,
            `Print debugging information while loading variables.`)
        .example(
            `rcloadenv my-config --projectId my-project-id -- node app.js`,
            `Specify the project ID to use when loading variables.`)
        .wrap(120)
        .recommendCommands()
        .epilogue(
            `For more information, see https://github.com/googleapis/nodejs-rcloadenv`)
        .help()
        .strict();

async function main(argv: string[]) {
  const opts = cli.parse(argv);
  const configName = opts._[0];
  const args = opts._.slice(1);

  if (!configName || !args.length) {
    console.error(USAGE);
    process.exit(1);
  }

  const currentEnv = Object.assign({}, process.env);
  const env = await rcloadenv.getAndApply(
      configName, currentEnv, opts as rcloadenv.RCLoadEnvOptions);
  await new Promise((resolve, reject) => {
    childProcess.spawn(args.shift()!, args, {stdio: 'inherit', env})
        .on('error', reject)
        .on('exit', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error('Command failed'));
          }
        });
  });
}

if (module === require.main) {
  main(process.argv.slice(2)).catch(console.error);
}
