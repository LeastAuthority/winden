import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

const webpackConfig = require(path.join(__dirname, "../webpack.config.js"));
const PORT = 8080;

const app = express();

app.use(express.static(path.join(__dirname, "../src/public")));

app.use(
  createProxyMiddleware("/v1", {
    target: "http://feedback-api:8001",
    changeOrigin: true,
  })
);

app.use(
  webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: "/app",
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/public/index.html"));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
