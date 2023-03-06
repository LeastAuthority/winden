#!/usr/bin/env bash

until cd /usr/src/app/client && npm install --include=dev
do
    echo "Retrying npm install"
    sleep 1
done
gulp watch