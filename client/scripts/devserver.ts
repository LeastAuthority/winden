import express from "express";
import fs from "fs";
import { createProxyMiddleware } from "http-proxy-middleware";
import https from "https";
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
  createProxyMiddleware("/mailbox", {
    target: "http://mailbox:4000",
    changeOrigin: true,
    ws: true,
    pathRewrite: { "^/mailbox": "" },
  })
);

app.use(
  createProxyMiddleware("/relay", {
    target: "http://relay:4002",
    changeOrigin: true,
    ws: true,
    pathRewrite: { "^/relay": "" },
  })
);

let bundled = false;
app.get("/bundle-status", (req, res) => {
  res.send(bundled.toString());
});

const webpackDevServer = webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: "/app",
});
app.use(webpackDevServer);
webpackDevServer.waitUntilValid(() => {
  console.log(`Bundle has been compiled successfully`);
  bundled = true;
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/public/index.html"));
});

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "../certs/server.key")),
    cert: fs.readFileSync(path.join(__dirname, "../certs/server.cert")),
    passphrase: "gulp",
  },
  app
);

server.listen(PORT, () =>
  console.log(`Development server is now listening on port ${PORT}!`)
);
