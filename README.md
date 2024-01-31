<h1 align="center">
  <a href="https://winden.app"><img src="https://raw.githubusercontent.com/LeastAuthority/winden/main/client/src/public/LA_Winden_HorizontalLogo_Color.svg" height="100" alt="Winden Logo"></a>
</h1>

Be aware, this is a **Beta version**, which might have some [issues](https://winden.app/faq) or not work as expected in all browsers.

# Winden - Magic Wormhole web application

Winden is a free web application for secure, fast, and easy file transfers between devices in real-time. Winden is identity-free, meaning that senders and receivers don’t need to know each other’s identity to use it, or to reveal their identity to us.

We do not require people to sign up or log in and we cannot access any files you send, as they are end-to-end encrypted. Files are never stored on our servers and transfers happen in real-time. While these aspects ensure the app is more private and secure, it means that both the sender and receiver need to be online at the same time. **Learn more about how Winden works in our [FAQ](https://winden.app/faq)**.

Based on the [Magic Wormhole protocol](https://magic-wormhole.readthedocs.io/), Winden was developed to scale the protocol without compromising its security and make it ready for web-usage. Part of this work was funded by the European Union’s [Next Generation Internet](https://www.ngi.eu/) program (NGI_Trust).

**Try it out at [winden.app](https://winden.app)**.

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

- npm
- docker
- docker compose

### Set up docker images

```sh
docker compose build
docker compose run client npm i
docker compose run client ./scripts/setup.sh
docker compose -f docker-compose.yml -f docker-compose.e2e.yml run client-e2e npm i
```

### Set up pre-commit hooks

```sh
npm i
```

### Run development environment

Start the `client` service. This will run development server on port 8080.

```sh
docker compose up -d client
```

Note: the server will serve HTTPS using a self-signed certificate, so you must visit `https://localhost:8080`, using `https` instead of `http`.
You must set up your browser to allow the certificate on port `localhost:8080` as well as `localhost:35729` for live reloading to work.

### View logs

```sh
docker compose logs -f
```

#### Email from Feedback API

We use a dummy SMTP server to log emails sent from `feedback-api`. To view the emails, run the following command:

```sh
docker compose logs -f dummy-smtp-server
```

### Stop development environment

```sh
docker compose down
```

### Storybook

```sh
docker compose run -p 6006:6006 client npm run storybook
```

### Format code

Winden uses [prettier](https://prettier.io/) for code formatting. When code is pushed to this repo, a git hook will run to verify that the code is formatted. The push will be rejected if the check fails. In order to successfully push, format the code with the following command:

```
docker compose run client npm run format
```

## Testing

### Setup

The e2e tests run on the selenium docker containers. They will run the test against the `client` running on the host.
To get the containers to connect to be able to connect to the host, we need to add the host's local IP to the environment:

1. Copy the file `./.env.example` to `./.env`.
2. Inside `./.env`, insert `HOST_IP=<YOUR_IP_HERE>` (you could find your local IP through `ifconfig` or similar)

### Running tests

Run the unit and integration tests using the following:

```sh
# run tests once
docker compose run client npm run test
# or automatically re-run tests when editing a file
docker compose run client npm run test -- --watch

# or run individual tests
docker compose run client npm run test -- client/src/app/components/CodeInput.test.tsx
```

Run the end-to-end tests with the following

```sh
# Run the tests. This would also start the selenium hub if it's not running yet.
docker compose -f docker-compose.yml -f docker-compose.e2e.yml run --rm client-e2e
# If running on ARM64, you must use the e2e-arm64 override instead.
docker compose -f docker-compose.yml -f docker-compose.e2e-arm64.yml run --rm client-e2e

# Once you're done working with the e2e tests, stop the containers running the selenium hub.
docker compose --profile e2e down
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
MAILBOX_URL="wss://<mailbox server>/v1"
RELAY_URL="wss:///<relay server>"
# Use the following line for a development build
NODE_ENV=development
```

(Production environment)

```sh
# Production
MAILBOX_URL="wss://<mailbox server>/v1"
RELAY_URL="wss:///<relay server>"
# Or use the following line instead for a production build
NODE_ENV=production
```

## Deploying

- Create `client/.env` if it does not exist already
- Fill it with the following: (Replace placeholders in angle brackets with the appropriate values)

```sh
SFTP_USERNAME=<username>
SFTP_IDENTITY=<path to ssh key>
SFTP_HOSTNAME=<hostname>

MAILBOX_URL="wss://<mailbox server>/v1"
RELAY_URL="wss://<relay server>"
NODE_ENV=production # or `development` if deploying to playground
```

Now you can deploy by running the following:

```sh
docker-compose run client npm run deploy
```

Note that this will also create a new [build](#building) of the app.

## Codebase Architecture

See [ARCHITECTURE.md](/ARCHITECTURE.md) for an in-depth look at the codebase structure.
