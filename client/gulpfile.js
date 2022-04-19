const del = require("del");
const exec = require("child_process").exec;
const gulp = require("gulp");
const connect = require("gulp-connect");
const webpack = require("webpack-stream");

const javascript = () =>
  gulp
    .src("src/app/index.tsx")
    .pipe(
      webpack({
        mode: "development",
        devtool: "inline-source-map",
        resolve: {
          extensions: [".tsx", ".ts"],
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: "ts-loader",
              exclude: /node_modules/,
            },
          ],
        },
      })
    )
    .pipe(gulp.dest("dist/app"))
    .pipe(connect.reload());

const publicClean = () => del(["dist/*", "!dist/app", "!dist/wormhole.wasm"]);
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
  gulp.watch("src/app/**/*.{ts,tsx}", { ignoreInitial: false }, javascript);
  gulp.watch("src/public/**/*", { ignoreInitial: false }, public);
  gulp.watch("vendor/wormhole-william/**/*.go", { ignoreInitial: false }, wasm);
  connect.server({
    host: "0.0.0.0",
    root: "dist",
    livereload: true,
  });
};

const clean = () => del("dist");

exports.javascript = javascript;
exports.public = public;
exports.wasm = wasm;
exports.watch = watch;
exports.clean = clean;

exports.default = gulp.parallel(javascript, public, wasm);
