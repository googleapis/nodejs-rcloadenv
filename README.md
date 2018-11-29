<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Inc. logo" title="Google" align="right" height="96" width="96"/>

# rcloadenv for Node.js

Node.js implementation of [rcloadenv][].

Wraps execution of a given command and loads variables from the
[Google Cloud Runtime Config API][runtime] into that process.

[rcloadenv]: https://github.com/googleapis/nodejs-rcloadenv
[runtime]: https://cloud.google.com/deployment-manager/runtime-configurator/reference/rest/

## CLI

### Global Installation
```sh
npm install -g @google-cloud/rcloadenv
```

### Local Installation
```sh
npm install @google-cloud/rcloadenv
```

Now wrap your app's `start` script with `rcloadenv` in `package.json`:

```json
"scripts": {
  "start": "rcloadenv my-config -- node app.js"
}
```

### Usage

Output of `rcloadenv --help`:

```
Wrap execution of the given command with runtime-config variables.
Usage: rcloadenv <configName> [options] -- [args...]

Options:
  --version                   Show version number                                                              [boolean]
  --debug, -d                 Print debugging information.                                                     [boolean]
  --except, -E                If provided, a list of of runtime-config variables to exclude, otherwise all
                              runtime-config variables will be used.                                             [array]
  --only, -O                  If provided, a list of of runtime-config variables to load, otherwise all runtime-config
                              variables will be used.                                                            [array]
  --override, -o              Determines the behavior of rcloadenv in the case when a runtime-config variable conflicts
                              with a variable already available in the environment. If true, a runtime-config variable
                              will override the existing environment variable, otherwise the existing environment
                              variable will be kept.                                          [boolean] [default: false]
  --projectId, --project, -p  The project where the specified config is located.                                [string]
  --help                      Show help                                                                        [boolean]

Examples:
  rcloadenv my-config -- bash -c 'echo $MY_VARIABLE_NAME'       Print a variable's value from the specified config.
  rcloadenv my-config --only var1 var2 -- node app.js           Only load two variables from runtime-config.
  rcloadenv my-config --except var1 var2 -- node app.js         Load all but two variables from runtime-config.
  rcloadenv my-config --debug -- node app.js                    Print debugging information while loading variables.
  rcloadenv my-config --projectId my-project-id -- node app.js  Specify the project ID to use when loading variables.

For more information, see https://github.com/googleapis/nodejs-rcloadenv
```

## API

### Installation
```sh
npm install @google-cloud/rcloadenv
```

### Usage

Just load raw variables from the Runtime Config service:

```js
const rcloadenv = require('@google-cloud/rcloadenv');

rcloadenv.getVariables('my-config')
  .then((variables) => {
    variables.forEach((variable) => {
      console.log(variable);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
```

Load the variables and apply them to the current environment:
```js
const rcloadenv = require('@google-cloud/rcloadenv');

rcloadenv.getAndApply('my-config')
  .then(() => {
    console.log(process.env.MY_VAR);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
```

Load the variables and mix them into a provided object:
```js
const rcloadenv = require('@google-cloud/rcloadenv');
const newEnv = Object.assign({}, process.env);
rcloadenv.getAndApply('my-config', newEnv)
  .then((env) => {
    console.log(env.MY_VAR);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
```

## Contributing
See the [CONTRIBUTING.md](https://github.com/googleapis/nodejs-rcloadenv/tree/master/CONTRIBUTING.md) file.

## License
Apache-2.0, see the [LICENSE](https://github.com/googleapis/nodejs-rcloadenv/tree/master/LICENSE) file.
