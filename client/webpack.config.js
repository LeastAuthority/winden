const Dotenv = require("dotenv-webpack");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: path.join(__dirname, "src/app/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist/app"),
    filename: "main.js",
  },
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
