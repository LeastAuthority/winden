const del = require("del");
const { exec, execSync } = require("child_process");
const gulp = require("gulp");
const connect = require("gulp-connect");
const webpack = require("webpack-stream");
const Dotenv = require("dotenv-webpack");
const SentryPlugin = require("@sentry/webpack-plugin");

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
    .pipe(gulp.dest("dist/app"))
    .pipe(connect.reload());

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
  gulp.src("src/public/**/*").pipe(gulp.dest("dist")).pipe(connect.reload());
const public = gulp.series(publicClean, publicCopy);

const wasmBuild = () =>
  exec(
    "cd vendor/wormhole-william && GOOS=js GOARCH=wasm go build -o ../../dist/wormhole.wasm ./wasm/module"
  );
// exec doesn't return a stream, but we need a non-empty stream to be able to reload.
// so we build a stream using gulpfile.js
const wasmReload = () => gulp.src("gulpfile.js").pipe(connect.reload());
const wasm = gulp.series(wasmBuild, wasmReload);

const watch = () => {
  gulp.watch("src/app/**/*.{ts,tsx,css}", { ignoreInitial: false }, javascript);
  gulp.watch("src/worker/**/*.{js,ts,tsx}", { ignoreInitial: false }, worker);
  gulp.watch("src/public/**/*", { ignoreInitial: false }, public);
  gulp.watch("vendor/wormhole-william/**/*.go", { ignoreInitial: false }, wasm);
  connect.server({
    host: "0.0.0.0",
    root: "dist",
    livereload: true,
  });
};

const clean = () => del("dist");

const deploy = (cb) => {
  execSync(`aws s3 sync ./dist ${process.env.S3_BUCKET}`);
  execSync(`aws cloudfront create-invalidation \
    --distribution-id ${process.env.CDF_DISTRIBUTION_ID} \
    --paths /index.html \
     /wormhole.wasm \
     /worker/main.js`);
  cb();
};

exports.javascript = javascript;
exports.worker = worker;
exports.public = public;
exports.wasm = wasm;
exports.storybook = storybook;
exports.watch = watch;
exports.clean = clean;
exports.build = gulp.series(
  public,
  javascript,
  worker,
  wasm,
  storybook
);
exports.deploy = gulp.series(
  public,
  javascript,
  worker,
  wasm,
  storybook,
  deploy
);

exports.default = gulp.series(public, javascript, worker, wasm, storybook);
