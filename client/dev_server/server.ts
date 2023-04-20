import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

const webpackConfig = require(path.join(__dirname, "../webpack.config.js"));
const PORT = 8080;

const app = express();

app.use(express.static(path.join(__dirname, "../src/public")));
app.use(
  webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: "/app",
  })
);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
