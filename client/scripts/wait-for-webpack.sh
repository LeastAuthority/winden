#!/usr/bin/env bash
printf "Waiting for webpack to compile...\n"
while :; do
  sleep 1
  printf .
  status="$(curl -s -k "http://localhost:8080/bundle-status")" 
  if [[ $status =~ "true" ]]; then
    break
  fi
done
printf "\nWebpack compiled successfully.\n"
