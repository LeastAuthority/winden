const del = require("del");
const { exec, execSync } = require("child_process");
const gulp = require("gulp");
const log = require("fancy-log");
const connect = require("gulp-connect");
const replace = require("gulp-replace");
const gulpif = require("gulp-if");
const webpackStream = require("webpack-stream");
const Dotenv = require("dotenv-webpack");
const fs = require("fs");
const path = require("path");
const proxy = require("http-proxy-middleware");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

require("dotenv").config();

const package = JSON.parse(fs.readFileSync("./package.json"));

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
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "./wasm"),
      outDir: path.resolve(__dirname, "./pkg"),
    }),
    new Dotenv(),
  ],
  optimization: {
    minimize: process.env.NODE_ENV === "production",
  },
  experiments: {
    asyncWebAssembly: true,
  },
};

const javascript = () =>
  gulp
    .src(`src/app/index.tsx`)
    .pipe(
      webpackStream({
        ...webpackConfig,
        entry: ["web-streams-polyfill/ponyfill", `./src/app/index.tsx`],
      })
    )
    .pipe(gulp.dest("dist/app"));

const javascriptWatch = () =>
  gulp
    .src(`src/app/index.tsx`)
    .pipe(
      webpackStream({
        ...webpackConfig,
        watch: true,
        entry: ["web-streams-polyfill/ponyfill", `./src/app/index.tsx`],
      })
    )
    .pipe(gulp.dest("dist/app"))
    .pipe(connect.reload());

const storybook = () => exec("npm run build-storybook");

const publicClean = () => del(["dist/*", "!dist/app", "!dist/storybook"]);
const publicCopy = () =>
  gulp
    .src("src/public/**/*", { dot: true })
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());

// Set version in title of main html file to be visible for clients
const setPublicVersion = async () => {
  gulp
    .src(["dist/index.html"])
    .pipe(
      replace(
        new RegExp(`<title>(.*)</title>`),
        "<title>$1 (" + package.version + ")</title>"
      )
    )
    .pipe(gulp.dest("dist/"));
};

// allow search engine to crawl production deployment instances only
const allowRobots = () =>
  gulp
    .src(["dist/robots.txt"])
    .pipe(
      gulpif(process.env.ENVIRONMENT === "prod", replace("Disallow", "Allow"))
    )
    .pipe(gulp.dest("dist"));

const public = gulp.series(
  publicClean,
  publicCopy,
  setPublicVersion,
  allowRobots
);

const start = () => {
  connect.server({
    host: "0.0.0.0",
    root: "dist",
    livereload: true,
    fallback: "src/public/index.html",
    middleware: () => {
      return [
        proxy.createProxyMiddleware("/v1", {
          target: "http://feedback-api:8001",
          changeOrigin: true,
        }),
      ];
    },
  });
};

const watch = () => {
  gulp.watch(
    "src/app/**/*.{ts,tsx,css}",
    { ignoreInitial: false },
    javascriptWatch
  );
  gulp.watch("src/public/**/*", { ignoreInitial: false }, public);
  start();
};

const clean = () => del("dist");

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
exports.public = public;
exports.storybook = storybook;
exports.watch = gulp.series(watch);
// for CI optimization without watch
exports.start = start;
exports.clean = clean;

exports.deploy = gulp.series(
  public,
  javascript,
  // storybook,
  deploySftp
);

exports.default = gulp.series(public, javascript, storybook);
