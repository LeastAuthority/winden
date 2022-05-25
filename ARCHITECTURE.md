# ARCHITECTURE.md

This document describes the codebase, including details such as folder structure, technology stack, and style guide.

## Folder structure

The folder structure looks like so:

```
- client/
- client-e2e/
- mailbox/
- relay/
- docker-compose.yml
```

The codebase is meant to be run on docker containers through `docker-compose`. Each top-level folder is responsible for a particular container, so there's a `docker-compose.yml` file as well as a `Dockerfile` in each folder.

- `mailbox` runs the magic wormhole mailbox
- `relay` runs the magic wormhole transit relay
- `client` contains the code for the front-end. It uses `mailbox` and `relay` to achieve magic wormhole functionality.
- `client-e2e` is a project using [WebdriverIO](https://webdriver.io/) and [Selenium](https://www.selenium.dev/) to run end-to-end tests for `client`.

### Selenium docker containers

To run the tests, Selenium hub is run through docker-compose. This is convenient for developers since they won't need to have selenium and all the browser engines installed. (See [testing](#testing) for more testing information)

## `client` tech stack

`client` is a [NodeJS](https://nodejs.org/en/) codebase written in [TypeScript](https://www.typescriptlang.org/). It uses [the npm cli](https://docs.npmjs.com/cli/) to manage dependencies.
[Webpack](https://webpack.js.org/) and [Gulp](https://gulpjs.com/) are used to compile the source code (located in `client/src`) to static files to be viewed by the browser.

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
    - wormhole
  - public
  - worker
- vendor
  - wormhole-william
```

### `src`

- `src` is where all our first-party code goes.

### `vendor`

- `vendor` as of now only contains a submodule to `wormhole-william`. This is included to compile the wasm module (`wormhole.wasm`). The compilation is handled by Gulp.

### `src/app`

The react app code is located here.

- `src/app/components` for React components.
- `src/app/hooks` for React hooks.
- `src/app/types` for type-only `.ts` files and `d.ts` files
- `src/app/util` contain files that typically export a single pure function or several constant values. They are usually shared across multiple files
- `src/app/wormhole` contains bridge code to interact with the webworker code located at `src/worker` (see [src/worker](#srcworker))

### `src/worker`

- `src/worker` contains code that compiles the webworker. The webworker is responsible for communication with the wasm module compiled from `vendor/wormhole-william/wasm` (see [vendor](#vendor))

### `src/public`

- `src/public` contains static files that should be copied to the final build such as images, fonts, etc.

## Build process

`gulp` builds the following parts of the application and outputs them to `client/dist`, which can be viewed in the browser.

- the react app (`src/app`)
- the webworker (`src/worker`)
- the wasm module (`vendor/wormhole-william/wasm`)
- the static assets (`src/public`)

### Gulp task overview

- `gulp javascript` builds the react app to `dist/app`. The code is bundled by Webpack.
- `gulp worker` builds the webworker to `dist/worker`. The code is bundled by Webpack.
- `gulp public` copies the files in `src/public` to `dist`.
- `gulp` (the default task) will compile all parts at once.
- `gulp watch` will run a development server at `localhost:8080` that serves the `dist/` folder, as well as recompile on any file changes. [gulp-connect](https://github.com/avevlad/gulp-connect) is used so that the browser will automatically refresh the page on file change. This is the default command when starting the `client` container.
- `gulp clean` deletes the `dist` folder.

## CSS Modules

Webpack is configured to use [style-loader](https://webpack.js.org/loaders/style-loader/) and [css-loader](https://webpack.js.org/loaders/css-loader/), allowing you to import CSS from JS/TS files.
[CSS modules](https://github.com/css-modules/css-modules) is enabled if the file ends in `*.modules.css`. You will see this used often in `app/components` to generate scoped CSS per React component.

## Testing

- [Jest](https://jestjs.io/) is used as for unit/integration tests.
- [Testing Library](https://testing-library.com/) is used to write better integration tests for react components and hooks.
- WebdriverIO is used to write e2e tests. The tests are run through Selenium hub in a docker container. (See [this section](#selenium-docker-containers) for more info.)

### Style guide/Best practice

TODO
