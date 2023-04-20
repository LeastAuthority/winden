import fs from "fs-extra";
import path from "path";
import util from "util";
import webpack from "webpack";

const webpackConfig = require("../webpack.config.js");

fs.rm(path.join(__dirname, "../dist", ""), { recursive: true, force: true })
  .then(() => {
    return fs.copy(
      path.join(__dirname, "../src/public", ""),
      path.join(__dirname, "../dist", "")
    );
  })
  .then(() => {
    return util.promisify(webpack)(webpackConfig);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
