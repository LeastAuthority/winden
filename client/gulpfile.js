const gulp = require("gulp");

function testTask(cb) {
  cb();
}

function watch() {
  gulp.watch("src/*.html", testTask);
}

exports.default = watch;
