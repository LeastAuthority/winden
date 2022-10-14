<h1 align="center">
  <img src="https://raw.githubusercontent.com/LeastAuthority/winden/main/client/src/public/LA_Winden_HorizontalLogo_Color.svg" height="100" alt="Winden">
</h1>

Be aware, it is **Public Beta version**, which might have some issues or not work as expected in all browsers.

# Winden -  Magic Wormhole Web Application Client

Winden is a free web application for secure, fast, and easy file transfers between devices in real-time. Winden is identity-free, meaning that senders and receivers don’t need to know each other’s identity to use it, or to reveal their identity to us.

We do not require people to sign up or log in and we cannot access any files you send, as they are end-to-end encrypted. Files are never stored on our servers and transfers happen in real-time. While these aspects ensure the app is more private and secure, it means that both the sender and receiver need to be online at the same time. **Learn more about how Winden works in our [FAQ](https://winden.app/faq)**.

Based on the [Magic Wormhole protocol](https://magic-wormhole.readthedocs.io/) , Winden was developed to scale the protocol without compromising its security and make it ready for web-usage. Part of this work was funded by the European Union’s [Next Generation Internet](https://www.ngi.eu/) program (NGI_Trust).

**Try it out [winden.app](https://winden.app)**

## Development Setup

Follow these steps to get the whole setup running on a local computer for easy development and debugging.

### Cloning

```sh
git clone git@github.com:LeastAuthority/winden.git
cd winden
git submodule init
git submodule update --recursive
```

or you can do it in one step:

```sh
git clone --recurse-submodules git@github.com:LeastAuthority/winden.git
```

### System Prerequisites

- docker
- docker compose

### Setup docker images

```sh
docker compose build
docker compose run client npm i
docker compose run client-e2e npm i
```

### Run development environment

The following command will run `gulp watch` in the `client` container. `gulp watch` essentially does the following:

- rebuild the Javascript bundle whenever changes are made to the Javascript/Typescript source files
- rebuild the WASM module whenever changes are made to the `wormhole-willam` source files
- serve the output at localhost:8080 and automatically refresh the page on any change.

Learn more about the build system at [ARCHITECTURE.md](ARCHITECTURE.md#build-process)

```sh
docker compose up -d client
docker compose run -p 8080:8080 client gulp watch # equivalent command
```

### View logs

```sh
docker compose logs -f
```

### Stop development environment

```sh
docker compose down
```

### Storybook

```sh
docker compose run -p 6006:6006 client npm run storybook
```

## Testing

### Setup

The e2e tests run on the selenium docker containers. They will run the test against the `client` running on the host.
To get the containers to connect to be able to connect to the host, we need to add the host's local IP to the environment:

1. Create an empty file `./client-e2e/.env`.
2. Inside `./client-e2e/.env`, insert `HOST_IP=<YOUR_IP_HERE>` (you could find your local IP through `ifconfig` or similar)

### Running tests

Run the unit and integration tests using the following:

```sh
# run tests once
docker compose run client npm run test
# or automatically re-run tests when editing a file
docker compose run client npm run test -- --watch

# or run individual tests
docker compose run client npm run test -- -i client/src/worker/tests/streaming.test.ts
```

Run the end-to-end tests with the following

```sh
# Run the tests. This would also start the selenium hub if it's not running yet.
docker-compose run --rm client-e2e

# Once you're done working with the e2e tests, stop the containers running the selenium hub.
docker-compose --profile e2e down
```

### Debugging end-to-end tests

See https://github.com/SeleniumHQ/docker-selenium#debugging
And https://webdriver.io/docs/api/browser/debug/

> If you run the WDIO testrunner make sure you increase the timeout property of the test framework you are using (e.g. Mocha or Jasmine) in order to prevent test termination due to a test timeout. Also avoid executing the command with multiple capabilities running at the same time.

## Building

- Create `client/.env` if it does not exist already
- Fill it with the following for:

(Playground environment)
```sh
MAILBOX_URL="wss://mailbox.stage.mw.leastauthority.com/v1"
RELAY_URL="wss:///relay.stage.mw.leastauthority.com"

# Use the following line for a development build
NODE_ENV=development
```

(Production environment)
```sh
# Production
MAILBOX_URL="wss://mailbox.winden.app/v1"
RELAY_URL="wss:///relay.winden.app"
# Or use the following line instead for a production build
NODE_ENV=production
```

## Deploying

We build and deploy by running a gulp task inside a docker container. You will need to provide your AWS credentials to the container. We do this through the `.env` file.

- Create `client/.env` if it does not exist already
- Fill it with the following: (Replace placeholders in angle brackets with the appropriate values)

```sh
AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
AWS_DEFAULT_REGION=<REGION>

S3_BUCKET=<URL>
CDF_DISTRIBUTION_ID=<ID>

# use w3.leastauthority.com instead if deploying to playground
MAILBOX_URL="wss://mailbox.stage.mw.leastauthority.com/v1"
RELAY_URL="wss://relay.stage.mw.leastauthority.com"

NODE_ENV=production # or `development` if deploying to playground
```

Now you can deploy by running the following:

```sh
docker-compose run client gulp deploy
```

Note that this gulp task will also create a new [build](#building) of the app.

## Codebase Architecture

See [ARCHITECTURE.md](/ARCHITECTURE.md) for an in-depth look at the codebase structure.
