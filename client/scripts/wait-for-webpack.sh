#!/usr/bin/env bash
printf "Waiting for webpack to compile...\n"
while :; do
  sleep 5
  status="$(curl -k "https://localhost:8080/bundle-status")" 
  if [[ $status =~ "true" ]]; then
    break
  fi
done
printf "Webpack compiled successfully."