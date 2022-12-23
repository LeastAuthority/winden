# INSTRUCTIONS

1. Setup
```
cd playwright
npm install
npx playwright install
./scripts/generate-sized-test-files.sh tests/files/sizes
```

2. Launch Web App: `docker-compose run -p 8080:8080 client gulp watch`

3. Launch tests `npx playwright test`

4. Review results in web

