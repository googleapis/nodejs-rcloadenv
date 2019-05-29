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

import * as assert from 'assert';
import {Gaxios, GaxiosOptions} from 'gaxios';
import * as nock from 'nock';
import * as proxyquire from 'proxyquire';

import * as rcloadenv from '../src';

nock.disableNetConnect();
const fakeConfig = 'fake-config';
const fakeProjectId = 'fake-project';
const fakeResponse = {
  variables: [{name: 'fake', updateTime: 'fake', value: 'fake'}]
};
let calledWith: GaxiosOptions;

describe('rcloadenv api', () => {
  const rc = proxyquire('../src', {
               'google-auth-library': {
                 GoogleAuth: class {
                   constructor() {
                     return {
                       getProjectId: () => Promise.resolve(fakeProjectId),
                       request: (options: GaxiosOptions) => {
                         calledWith = options;
                         return Promise.resolve({data: fakeResponse});
                       }
                     };
                   }
                 }
               }
             }) as typeof rcloadenv;

  it('should transform variables', () => {
    assert.ok(rc.transform);
  });

  it('should load variables', async () => {
    const vars = await rc.getVariables(fakeConfig);
    assert.deepStrictEqual(vars, fakeResponse.variables);
  });

  it('should apply provided raw variables to the given object', async () => {
    assert.ok(rc.apply);
  });

  it('should get and apply variables', () => {
    assert.ok(rc.getAndApply);
  });

  it('should allow overriding the API endpoint', async () => {
    const apiEndpoint = 'fake.endpoint';
    const expectedUrl = `https://${
        apiEndpoint}/v1beta1/projects/fake-project/configs/fake-config/variables`;
    await rc.getVariables(fakeConfig, {apiEndpoint});
    assert.strictEqual(expectedUrl, calledWith.url);
  });
});
