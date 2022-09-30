FROM pypy:3.9-bullseye

COPY Pipfile /app/Pipfile
COPY ./Pipfile.lock /app/Pipfile.lock

WORKDIR /app

RUN apt update

RUN apt install rustc -y

# Build latest version from source
RUN pip install git+https://github.com/magic-wormhole/magic-wormhole-transit-relay.git#egg=magic-wormhole-transit-relay

CMD twist transitrelay --port=tcp:4001 --websocket=tcp:4002