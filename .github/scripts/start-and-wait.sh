printf "Starting server\n"
docker compose --profile e2e up -d client
printf "Waiting for webpack to compile...\n"
# try going back to hardcoded wait time
sleep 120
printf "Done sleeping"