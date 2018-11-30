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

if (
  !process.env.GCLOUD_PROJECT ||
  !process.env.GOOGLE_APPLICATION_CREDENTIALS
) {
  throw new Error(
    'The `GCLOUD_PROJECT` and `GOOGLE_APPLICATION_CREDENTIALS` environment variables must be set!'
  );
}

async function main() {
  // import the npm module
  const rcloadenv = require('@google-cloud/rcloadenv');

  // Just load raw variables from the Runtime Config service:
  const vars = await rcloadenv.getVariables('my-config');
  console.log(`${vars.length} variables found!`);
  vars.forEach(console.log);

  // Load the variables and apply them to the current environment
  await rcloadenv.getAndApply('my-config');
  console.log(process.env.fruit);

  // Load the variables and mix them into a provided object
  const newEnv = Object.assign({}, process.env);
  const env = await rcloadenv.getAndApply('my-config', newEnv);
  console.log(env.veggie);
}

main().catch(console.error);
