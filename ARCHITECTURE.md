# ARCHITECTURE.md

This document describes the codebase, including details such as folder structure, technology stack, and style guide.

## Folder structure

The folder structure looks like so:

```
- client/
- client-e2e/
- docker-compose.yml
```

The codebase is meant to be run on docker containers through `docker-compose`. Each top-level folder is responsible for a particular container, so there's a `docker-compose.yml` file as well as a `Dockerfile` in each folder.

- `client` contains the code for the front-end.
- `client-e2e` is a project using [WebdriverIO](https://webdriver.io/) and [Selenium](https://www.selenium.dev/) to run end-to-end tests for `client`.

### Selenium docker containers

To run the tests, Selenium hub is run through docker-compose. This is convenient for developers since they won't need to have selenium and all the browser engines installed. (See [testing](#testing) for more testing information)

## `client` tech stack

`client` is a [NodeJS](https://nodejs.org/en/) codebase written in [TypeScript](https://www.typescriptlang.org/). It uses [the npm cli](https://docs.npmjs.com/cli/) to manage dependencies.
[Webpack](https://webpack.js.org/) is used to compile the source code (located in `client/src`) to static files to be viewed by the browser.

For the frontend UI, [ReactJS](https://reactjs.org/) is used. React is used as it encourages declarative rendering and FP principles, which makes the code easier to maintain.

## `client` folder structure

The folder structure for `client` looks like this:

```
- src
  - app
    - components
    - hooks
    - types
    - util
  - public
- vendor
  - magic-wormhole.rs
- wasm
```

### `src`

- `src` is where all our first-party code goes.

### `vendor`

- `vendor` as of now only contains a submodule to `magic-wormhole.rs`. This is included to compile the wasm module.

### `wasm`

- `wasm` contains the bindings that allow us to use `magic-wormhole.rs` in the browser via webassembly.

### `src/app`

The react app code is located here.

- `src/app/components` for React components.
- `src/app/hooks` for React hooks.
- `src/app/types` for type-only `.ts` files and `d.ts` files
- `src/app/util` contain files that typically export a single pure function or several constant values. They are usually shared across multiple files

### `src/public`

- `src/public` contains static files that should be copied to the final build such as images, fonts, etc.

## CSS Modules

Webpack is configured to use [style-loader](https://webpack.js.org/loaders/style-loader/) and [css-loader](https://webpack.js.org/loaders/css-loader/), allowing you to import CSS from JS/TS files.
[CSS modules](https://github.com/css-modules/css-modules) is enabled if the file ends in `*.modules.css`. You will see this used often in `app/components` to generate scoped CSS per React component.

## Testing

- [Jest](https://jestjs.io/) is used as for unit/integration tests.
- [Testing Library](https://testing-library.com/) is used to write better integration tests for react components and hooks.
- WebdriverIO is used to write e2e tests. The tests are run through Selenium hub in a docker container. (See [this section](#selenium-docker-containers) for more info.)

### Style guide/Best practice

TODO
