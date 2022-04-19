const del = require("del");
const exec = require("child_process").exec;
const gulp = require("gulp");
const webpack = require("webpack-stream");

const javascript = () => {
  return gulp
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
    .pipe(gulp.dest("dist/app"));
};

const publicClean = () => del(["dist/*", "!dist/app", "!dist/wormhole.wasm"]);
const publicCopy = () => gulp.src("src/public/**/*").pipe(gulp.dest("dist"));
const public = gulp.series(publicClean, publicCopy);

const wasm = () => {
  return exec(
    "cd vendor/wormhole-william && GOOS=js GOARCH=wasm go build -o ../../dist/wormhole.wasm ./wasm/module"
  );
};

const watch = () => {
  gulp.watch("src/app/**/*.{ts,tsx}", { ignoreInitial: false }, javascript);
  gulp.watch("src/public/**/*", { ignoreInitial: false }, public);
  gulp.watch("vendor/wormhole-william/**/*.go", { ignoreInitial: false }, wasm);
};

const clean = () => {
  return del("dist");
};

exports.javascript = javascript;
exports.public = public;
exports.wasm = wasm;
exports.watch = watch;
exports.clean = clean;

exports.default = gulp.parallel(javascript, public, wasm);
