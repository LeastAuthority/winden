# Transfer-rewrite

Transfer is a graphical interface for doing file transfer via the Magic Wormhole protocol.

## Status

Refactoring original code: https://github.com/LeastAuthority/Transfer and switching to ReactJS.
Core repository is currently in ***evaluation stage***.
The web app is in 'alpha' state, and **not ready for production use**.

## Development Setup

Follow these steps to get the whole setup running on a local computer for easy development and debugging.

### Cloning

```
git clone git@github.com:LeastAuthority/Transfer-rewrite.git
cd Transfer
git submodule init
git submodule update --recursive
```

or you can do it in one step:

```
git clone --recurse-submodules git@github.com:LeastAuthority/Transfer-rewrite.git
```

### System Prerequisites

- docker
- docker-compose

### Setup docker images

```
docker-compose build
```

### Run development environment

```
docker-compose up -d client
```

Server should now be running at http://localhost:8080

### View logs

```sh
docker-compose logs -f
```

### Stop development environment

```
docker-compose down
```

## Testing

Run the unit and integration tests using the following:

```sh
docker-compose run client npm run test
```

Run the end-to-end tests with the following

```sh
# Run the tests. This would also start the selenium hub if it's not running yet.
docker-compose up client-e2e

# Once you're done working with the e2e tests, stop the containers running the selenium hub.
docker-compose --profile e2e down
```

### Debugging end-to-end tests

See https://github.com/SeleniumHQ/docker-selenium#debugging

## Codebase Architecture

See [ARCHITECTURE.md](/ARCHITECTURE.md) for an in-depth look at the codebase structure.
