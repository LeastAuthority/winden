# Deployment in AWS

AWS deployment scripts were removed from scripts as they are not used anymore. However below you can find some instructions, if you want to have deployment in AWS.

1. Add in *client/Dockerfile* `aws-cli` or install on machine from which deployment will be done
2. Define enviroment variables with correct values in *client/.env*: 
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
```
3. Add snippet in client/gulpfile.js
```
const deployAWS = (cb) => {
  execSync(`aws s3 sync ./dist ${process.env.S3_BUCKET}`);
  execSync(`aws cloudfront create-invalidation \
    --distribution-id ${process.env.CDF_DISTRIBUTION_ID} \
    --paths /index.html \
     /wormhole.wasm \
     /worker/main.js`);
  cb();
};
```
4. Run command `docker compose run client gulp deployAWS`