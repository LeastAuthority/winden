#!/usr/bin/env bash

until cd /usr/src/app/client-e2e && npm install --include=dev
do
    echo "Retrying npm install"
    sleep 1
done
npm run wdio