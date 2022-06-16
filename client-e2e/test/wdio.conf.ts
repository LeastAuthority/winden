import type { Options } from "@wdio/types";
import * as fs from "fs";
import * as fsExtra from "fs-extra";

global.downloadDir = "/tmp/test-downloads";

export const config: Options.Testrunner = {
  hostname: "selenium-hub",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "test/tsconfig.json",
    },
  },
  specs: ["./test/specs/**/*.ts"],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
        prefs: {
          directory_upgrade: true,
          prompt_for_download: false,
          "download.default_directory": global.downloadDir,
        },
      },
    },
    {
      browserName: "firefox",
    },
    {
      browserName: "MicrosoftEdge",
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  onPrepare: function (_config, _capabilities) {
    fs.chownSync(global.downloadDir, 1200, 1201);
  },
  onComplete: function () {
    fsExtra.emptyDirSync(global.downloadDir);
  },
};
