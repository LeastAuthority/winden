import type { Options } from "@wdio/types";
import { execSync } from "child_process";
import * as fsExtra from "fs-extra";

global.downloadDirBrowser = "/home/seluser/downloads";
global.downloadDir = "/home/node/downloads";

export const config: Options.Testrunner = {
  hostname: "selenium-hub",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "./tsconfig.json",
    },
  },
  specs: ["./specs/**/*.ts"],

  exclude: ["./specs/send-large-files.ts"],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
        prefs: {
          "download.default_directory": global.downloadDirBrowser,
          "download.directory_upgrade": true,
          "download.prompt_for_download": false,
          "savefile.default_directory": global.downloadDirBrowser,
        },
      },
    },
    {
      browserName: "firefox",
      acceptInsecureCerts: true,
      "moz:firefoxOptions": {
        prefs: {
          "browser.download.dir": global.downloadDirBrowser,
          "browser.download.folderList": 2,
        },
      },
    },
    {
      browserName: "MicrosoftEdge",
      acceptInsecureCerts: true,
      "ms:edgeOptions": {
        prefs: {
          "download.default_directory": global.downloadDirBrowser,
          "download.directory_upgrade": true,
          "download.prompt_for_download": false,
          "savefile.default_directory": global.downloadDirBrowser,
        },
      },
    },
  ],
  logLevel: "error",
  bail: 0,
  baseUrl: "http://client:8080",
  waitforTimeout: 10000,
  connectionRetryTimeout: 60000,
  connectionRetryCount: 2,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },
  onPrepare: function (_config, _capabilities) {
    execSync("./scripts/generate-CI-test-files.sh");
  },
  beforeTest: function () {
    fsExtra.emptyDirSync(global.downloadDir);
  },
  afterTest: function () {
    afterEach(async () => {
      const handles = await browser.getWindowHandles();
      for (let i = 1; i < handles.length; i++) {
        await browser.switchToWindow(handles[i]);
        await browser.closeWindow();
      }
      await browser.switchToWindow(handles[0]);
      await browser.url("about:blank");
    });
  },
};
