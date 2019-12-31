# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/@google-cloud/rcloadenv?activeTab=versions

### [1.1.5](https://www.github.com/googleapis/nodejs-rcloadenv/compare/v1.1.4...v1.1.5) (2019-12-31)


### Bug Fixes

* **deps:** pin TypeScript below 3.7.0 ([163a603](https://www.github.com/googleapis/nodejs-rcloadenv/commit/163a6035c151181068936515e0c8946f260497e9))

### [1.1.4](https://www.github.com/googleapis/nodejs-rcloadenv/compare/v1.1.3...v1.1.4) (2019-11-21)


### Bug Fixes

* **deps:** update dependency yargs to v15 ([#123](https://www.github.com/googleapis/nodejs-rcloadenv/issues/123)) ([2ec222b](https://www.github.com/googleapis/nodejs-rcloadenv/commit/2ec222b07ea7a6013c141f92c84d5ede1ca10a64))
* **docs:** add jsdoc-region-tag plugin ([#120](https://www.github.com/googleapis/nodejs-rcloadenv/issues/120)) ([57d613a](https://www.github.com/googleapis/nodejs-rcloadenv/commit/57d613af7ae5aa68ae0889283c4c8f646ce86496))
* **docs:** release level should be beta ([00b4a52](https://www.github.com/googleapis/nodejs-rcloadenv/commit/00b4a5265b6a673fba8d7b9df80f5594b2acef9a))

### [1.1.3](https://www.github.com/googleapis/nodejs-rcloadenv/compare/v1.1.2...v1.1.3) (2019-08-25)


### Bug Fixes

* **deps:** update dependency yargs to v14 ([229960d](https://www.github.com/googleapis/nodejs-rcloadenv/commit/229960d))

### [1.1.2](https://www.github.com/googleapis/nodejs-rcloadenv/compare/v1.1.1...v1.1.2) (2019-07-26)


### Bug Fixes

* **deps:** update dependency google-auth-library to v5 ([#97](https://www.github.com/googleapis/nodejs-rcloadenv/issues/97)) ([fbf458d](https://www.github.com/googleapis/nodejs-rcloadenv/commit/fbf458d))

### [1.1.1](https://www.github.com/googleapis/nodejs-rcloadenv/compare/v1.1.0...v1.1.1) (2019-06-26)


### Bug Fixes

* **docs:** make anchors work in jsdoc ([#93](https://www.github.com/googleapis/nodejs-rcloadenv/issues/93)) ([ee0be6d](https://www.github.com/googleapis/nodejs-rcloadenv/commit/ee0be6d))

## [1.1.0](https://www.github.com/googleapis/nodejs-rcloadenv/compare/v1.0.0...v1.1.0) (2019-06-05)


### Features

* support apiEndpoint override ([#87](https://www.github.com/googleapis/nodejs-rcloadenv/issues/87)) ([557a892](https://www.github.com/googleapis/nodejs-rcloadenv/commit/557a892))

## [1.0.0](https://www.github.com/googleapis/nodejs-rcloadenv/compare/v0.3.3...v1.0.0) (2019-05-14)


### Bug Fixes

* **deps:** update dependency google-auth-library to v4 ([#79](https://www.github.com/googleapis/nodejs-rcloadenv/issues/79)) ([1386b78](https://www.github.com/googleapis/nodejs-rcloadenv/commit/1386b78))


### Build System

* upgrade engines field to >=8.10.0 ([#71](https://www.github.com/googleapis/nodejs-rcloadenv/issues/71)) ([542f935](https://www.github.com/googleapis/nodejs-rcloadenv/commit/542f935))


### Miscellaneous Chores

* **deps:** update dependency gts to v1 ([#68](https://www.github.com/googleapis/nodejs-rcloadenv/issues/68)) ([972b473](https://www.github.com/googleapis/nodejs-rcloadenv/commit/972b473))


### BREAKING CHANGES

* **deps:** this will ship async/await with the generated code.
* upgrade engines field to >=8.10.0 (#71)

## v0.3.3

03-12-2019 12:20 PDT

Greetings y'all!  This is a patch service release that bumps a few dependencies.  That's it!

### Dependencies
- fix(deps): update dependency yargs to v13 ([#49](https://github.com/googleapis/nodejs-rcloadenv/pull/49))
- fix(deps): update dependency google-auth-library to v3 ([#39](https://github.com/googleapis/nodejs-rcloadenv/pull/39))

### Documentation
- docs: update links in contrib guide ([#51](https://github.com/googleapis/nodejs-rcloadenv/pull/51))
- docs: update contributing path in README ([#46](https://github.com/googleapis/nodejs-rcloadenv/pull/46))
- docs: move CONTRIBUTING.md to root ([#45](https://github.com/googleapis/nodejs-rcloadenv/pull/45))
- docs: add lint/fix example to contributing guide ([#43](https://github.com/googleapis/nodejs-rcloadenv/pull/43))

### Internal / Testing Changes
- build: Add docuploader credentials to node publish jobs ([#55](https://github.com/googleapis/nodejs-rcloadenv/pull/55))
- build: use node10 to run samples-test, system-test etc ([#54](https://github.com/googleapis/nodejs-rcloadenv/pull/54))
- build: update release configuration
- chore(deps): update dependency mocha to v6
- build: use linkinator for docs test ([#50](https://github.com/googleapis/nodejs-rcloadenv/pull/50))
- build: create docs test npm scripts ([#48](https://github.com/googleapis/nodejs-rcloadenv/pull/48))
- build: test using @grpc/grpc-js in CI ([#47](https://github.com/googleapis/nodejs-rcloadenv/pull/47))
- chore(deps): update dependency eslint-config-prettier to v4 ([#41](https://github.com/googleapis/nodejs-rcloadenv/pull/41))
- build: ignore googleapis.com in doc link check ([#40](https://github.com/googleapis/nodejs-rcloadenv/pull/40))
- build: check broken links in generated docs ([#37](https://github.com/googleapis/nodejs-rcloadenv/pull/37))
- refactor: improve the sample tests ([#36](https://github.com/googleapis/nodejs-rcloadenv/pull/36))
- chore: add synth.metadata ([#35](https://github.com/googleapis/nodejs-rcloadenv/pull/35))
- chore(build): inject yoshi automation key ([#34](https://github.com/googleapis/nodejs-rcloadenv/pull/34))
- chore: update nyc and eslint configs ([#33](https://github.com/googleapis/nodejs-rcloadenv/pull/33))
- chore: fix publish.sh permission +x ([#32](https://github.com/googleapis/nodejs-rcloadenv/pull/32))
- fix(build): fix Kokoro release script ([#31](https://github.com/googleapis/nodejs-rcloadenv/pull/31))
- build: add Kokoro configs for autorelease ([#30](https://github.com/googleapis/nodejs-rcloadenv/pull/30))
- chore: always nyc report before calling codecov ([#27](https://github.com/googleapis/nodejs-rcloadenv/pull/27))
- chore: nyc ignore build/test by default ([#26](https://github.com/googleapis/nodejs-rcloadenv/pull/26))

## v0.3.2

12-04-2018 16:20 PST

### Internal / Testing Changes
- fix(build): replace project system test key ([#23](https://github.com/googleapis/nodejs-rcloadenv/pull/23))
- test: use execa for tests ([#22](https://github.com/googleapis/nodejs-rcloadenv/pull/22))
- chore: update license file ([#21](https://github.com/googleapis/nodejs-rcloadenv/pull/21))

## v0.3.1

12-02-2018 22:02 PST

### Internal / Testing Changes
- chore(deps): update dependency typescript to ~3.2.0 ([#16](https://github.com/googleapis/nodejs-rcloadenv/pull/16))
- fix(deps): update dependency yargs to v12 ([#17](https://github.com/googleapis/nodejs-rcloadenv/pull/17))
- chore(build): Configure Renovate ([#12](https://github.com/googleapis/nodejs-rcloadenv/pull/12))
- fix(build): fix system key decryption ([#11](https://github.com/googleapis/nodejs-rcloadenv/pull/11))
- chore(build): add encrypted key ([#13](https://github.com/googleapis/nodejs-rcloadenv/pull/13))

## v0.3.0

11-29-2018 23:18 PST

### Bug fixes
- fix: drop usage of got and support node 6 ([#5](https://github.com/googleapis/nodejs-rcloadenv/pull/5))
- fix: use the correct path ([#1](https://github.com/googleapis/nodejs-rcloadenv/pull/1))
- fix: address feedback

### New Features
- feat: convert to typescript ([#4](https://github.com/googleapis/nodejs-rcloadenv/pull/4))

### Documentation
- docs: add samples and sample tests ([#3](https://github.com/googleapis/nodejs-rcloadenv/pull/3))
- docs: update the readme ([#2](https://github.com/googleapis/nodejs-rcloadenv/pull/2))

### Internal / Testing Changes
- test: add a few unit tests ([#6](https://github.com/googleapis/nodejs-rcloadenv/pull/6))
