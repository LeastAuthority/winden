printf "Starting server"
docker compose --profile e2e up -d client
printf "Waiting for webpack to compile..."
{ docker compose logs -f --tail 0 client & echo $! > pid; } | { grep -P -m1 "webpack .+ compiled successfully" && kill -9 $(cat pid) && rm pid; }