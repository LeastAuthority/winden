#!/usr/bin/env bash
printf "Starting server\n"
docker compose --profile e2e up -d client
printf "Waiting for webpack to compile...\n"
while :; do
  sleep 1
  status="$(curl -s -k "https://127.0.0.1:8080/bundle-status")" 
  if [[ $status =~ "true" ]]; then
    break
  fi
done
printf "Webpack compiled successfully."