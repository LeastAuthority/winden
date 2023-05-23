#!/bin/sh
mkdir -p certs
openssl req -nodes -new -x509 -days 3650 -subj '/C=PH/O=Internet Widgits Pty Ltd' -keyout certs/server.key -out certs/server.cert