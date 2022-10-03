FROM pypy:3.9-bullseye

COPY Pipfile /app/Pipfile
COPY ./Pipfile.lock /app/Pipfile.lock

WORKDIR /app

RUN apt update

RUN apt install rustc -y

RUN pip install git+https://github.com/magic-wormhole/magic-wormhole-mailbox-server.git#egg=magic-wormhole-mailbox-server

CMD twist wormhole-mailbox