const exec = require("child_process").exec;
const gulp = require("gulp");

function wasm() {
  return exec(
    "cd vendor/wormhole-william && GOOS=js GOARCH=wasm go build -o ../../dist/wormhole.wasm ./wasm/module"
  );
}

function watch() {
  gulp.watch("vendor/wormhole-william/**/*.go", wasm);
}

exports.default = watch;
