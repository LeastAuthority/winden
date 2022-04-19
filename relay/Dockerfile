FROM python:3.9.1-buster

COPY Pipfile /app/Pipfile
COPY ./Pipfile.lock /app/Pipfile.lock

RUN pip install pipenv
WORKDIR /app
RUN pipenv install

CMD bash -c "pipenv install git+https://github.com/magic-wormhole/magic-wormhole-transit-relay.git#egg=magic-wormhole-transit-relay && pipenv run twist transitrelay --port=tcp:4001 --websocket=tcp:4002"
