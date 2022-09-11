# Transfer-rewrite

Transfer is a graphical interface for doing file transfer via the Magic Wormhole protocol.

## Status

Refactoring original code: https://github.com/LeastAuthority/Transfer and switching to ReactJS.
Core repository is currently in **_evaluation stage_**.
The web app is in 'alpha' state, and **not ready for production use**.

## Development Setup

Follow these steps to get the whole setup running on a local computer for easy development and debugging.

### Cloning

```sh
git clone git@github.com:LeastAuthority/Transfer-rewrite.git
cd Transfer
git submodule init
git submodule update --recursive
```

or you can do it in one step:

```sh
git clone --recurse-submodules git@github.com:LeastAuthority/Transfer-rewrite.git
```

### System Prerequisites

- docker
- docker-compose

### Setup docker images

```sh
docker-compose build
docker-compose run client npm i
docker-compose run client-e2e npm i
```

### Run development environment

The following command will run `gulp watch` in the `client` container. `gulp watch` essentially does the following:

- rebuild the Javascript bundle whenever changes are made to the Javascript/Typescript source files
- rebuild the WASM module whenever changes are made to the `wormhole-willam` source files
- serve the output at localhost:8080 and automatically refresh the page on any change.

Learn more about the build system at [ARCHITECTURE.md](ARCHITECTURE.md#build-process)

```sh
docker-compose up -d client
docker-compose run -p 8080:8080 client gulp watch # equivalent command
```

### View logs

```sh
docker-compose logs -f
```

### Stop development environment

```sh
docker-compose down
```

### Storybook

```sh
docker-compose run -p 6006:6006 client npm run storybook
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
docker-compose run client npm run test
# or automatically re-run tests when editing a file
docker-compose run client npm run test -- --watch
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

## Deploying to playground

We build and deploy by running a gulp task inside a docker container. You will need to provide your AWS credentials to the container. We do this through the `.env` file.

- Create `client/.env`
- Fill it with the following: (Replace placeholders in angle brackets with the appropriate values)

```sh
AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
AWS_DEFAULT_REGION=<REGION>

S3_BUCKET=<URL>
CDF_DISTRIBUTION_ID=<ID>

MAILBOX_URL="wss://mailbox.w3.leastauthority.com/v1"
RELAY_URL="wss://relay.w3.leastauthority.com:443"
```

Now you can deploy by running the following:

```sh
docker-compose run client gulp deploy_playground
```

## Codebase Architecture

See [ARCHITECTURE.md](/ARCHITECTURE.md) for an in-depth look at the codebase structure.
