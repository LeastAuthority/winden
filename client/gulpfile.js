const del = require("del");
const { exec, execSync } = require("child_process");
const gulp = require("gulp");
const log = require("fancy-log");
const connect = require("gulp-connect");
const replace = require('gulp-replace');
const gulpif = require('gulp-if');
const webpack = require("webpack-stream");
const Dotenv = require("dotenv-webpack");
const SentryPlugin = require("@sentry/webpack-plugin");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const webpackConfig = {
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      crypto: false,
      os: false,
      util: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    ...(process.env.NODE_ENV === "playground"
      ? [
          new SentryPlugin({
            release: process.env.RELEASE,
            include: "./dist",
            org: "least-authority",
            project: "transfer-rewrite",
          }),
        ]
      : []),
  ],
  optimization: {
    minimize: process.env.NODE_ENV === "production",
  },
};

const javascript = () =>
  gulp
    .src(`src/app/index.${process.env.NODE_ENV}.tsx`)
    .pipe(
      webpack({
        ...webpackConfig,
        entry: [
          "web-streams-polyfill",
          `./src/app/index.${process.env.NODE_ENV}.tsx`,
        ],
      })
    )
    .pipe(gulp.dest("dist/app"));

const javascriptWatch = () =>
  gulp
    .src(`src/app/index.${process.env.NODE_ENV}.tsx`)
    .pipe(
      webpack({
        ...webpackConfig,
        watch: true,
        entry: [
          "web-streams-polyfill",
          `./src/app/index.${process.env.NODE_ENV}.tsx`,
        ],
      })
    )
    .pipe(gulp.dest("dist/app"))
    .pipe(connect.reload());

const prepWorker = () => {
    // cp wasm_exec.js to be glued
    execSync(
      "cp \"$(go env GOROOT)/misc/wasm/wasm_exec.js\" src/worker"
    );
    // export as Go module
    execSync(
      "echo \"export default Go;\" >> src/worker/wasm_exec.js"
    );
}

const worker = () => 
  gulp
    .src("src/worker/index.ts")
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest("dist/worker"))
    .pipe(connect.reload());


const storybook = () => exec("npm run build-storybook");

const publicClean = () =>
  del([
    "dist/*",
    "!dist/app",
    "!dist/storybook",
    "!dist/worker",
    "!dist/wormhole.wasm",
  ]);
const publicCopy = () =>
  gulp
    .src("src/public/**/*", { dot: true })
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());

// allow search engine to crawl production deployment instances only
const allowRobots = () =>
  gulp
    .src(['dist/robots.txt'])
    .pipe(gulpif(process.env.ENVIRONMENT === "production" , replace('Disallow', 'Allow')))
    .pipe(gulp.dest('dist'));

const public = gulp.series(publicClean, publicCopy, allowRobots);

// added -buildvcs=false as it fails to build on Github actions with error obtaining VCS status: exit status 128
const wasmBuild = () =>
  exec(
    "cd vendor/wormhole-william && GOOS=js GOARCH=wasm go build  -buildvcs=false -o ../../dist/wormhole.wasm ./wasm/module"
  );
// exec doesn't return a stream, but we need a non-empty stream to be able to reload.
// so we build a stream using gulpfile.js
const wasmReload = () => gulp.src("gulpfile.js").pipe(connect.reload());
const wasm = gulp.series(wasmBuild, wasmReload);

const start = () => {
  connect.server({
    host: "0.0.0.0",
    root: "dist",
    livereload: true,
    middleware: function (connect, opt) {
      return [
        (req, res, next) => {
          if (
            !fs.existsSync(
              path.join(__dirname, "dist", req._parsedUrl.pathname)
            )
          ) {
            fs.readFile(
              path.join(__dirname, "dist/index.html"),
              (err, data) => {
                if (err) {
                  res.writeHead(500);
                  res.end(JSON.stringify(err));
                  return;
                }
                res.writeHead(200);
                res.end(data);
              }
            );
          } else {
            next();
          }
        },
      ];
    },
  });
};

const watch = () => {
  this.prepWorker();
  gulp.watch(
    "src/app/**/*.{ts,tsx,css}",
    { ignoreInitial: false },
    javascriptWatch
  );
  gulp.watch("src/worker/**/*.{js,ts,tsx}", { ignoreInitial: false }, worker);
  gulp.watch("src/public/**/*", { ignoreInitial: false }, public);
  gulp.watch("vendor/wormhole-william/**/*.go", { ignoreInitial: false }, wasm);
  start();
};

const clean = () => del("dist");

const deployAWS = (cb) => {
  execSync(`aws s3 sync ./dist ${process.env.S3_BUCKET}`);
  execSync(`aws cloudfront create-invalidation \
    --distribution-id ${process.env.CDF_DISTRIBUTION_ID} \
    --paths /index.html \
     /wormhole.wasm \
     /worker/main.js`);
  cb();
};

const deploySftp = (cb) => {
  // accept ssh host key of target
  execSync("mkdir -p ~/.ssh");
  execSync(
    `ssh-keyscan ${process.env.SFTP_HOSTNAME} > ~/.ssh/known_hosts 2>/dev/null`
  );
  fs.writeFileSync(
    path.join(process.env.HOME, "/.ssh/id_ed25519"),
    process.env.SFTP_IDENTITY,
    { mode: 0o600 }
  );

  // transfer files
  let environment = process.env.ENVIRONMENT ?? process.env.NODE_ENV;
  log.info(
    `Using environment: ${environment} (NODE_ENV: ${process.env.NODE_ENV}, ENVIRONMENT: ${process.env.ENVIRONMENT})`
  );
  execSync(
    `lftp sftp://${process.env.SFTP_USERNAME}:dummy@${process.env.SFTP_HOSTNAME}`,
    {
      input: `mirror -R dist winden_${environment}`,
    }
  );
  cb();
};

exports.javascript = javascript;
exports.worker = worker;
exports.public = public;
exports.wasm = wasm;
exports.storybook = storybook;
exports.watch = watch;
// for CI optimization without watch
exports.start = start;
exports.clean = clean;
exports.prepWorker = prepWorker;

exports.deploy = gulp.series(
  prepWorker,
  public,
  javascript,
  worker,
  wasm,
  // storybook,
  deploySftp
);

exports.default = gulp.series(prepWorker, public, javascript, worker, wasm, storybook);
