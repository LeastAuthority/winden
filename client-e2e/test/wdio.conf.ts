import type { Options } from "@wdio/types";
import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";

// global.downloadDir = path.join(__dirname, "tempDownload");
global.downloadDir = "/tmp/test-downloads";

// Pulled from https://gist.github.com/tkihira/2367067
// this could be moved to a separate file if we wanted
function rmdir(dir: string) {
  var list = fs.readdirSync(dir);
  for (var i = 0; i < list.length; i++) {
    var filename = path.join(dir, list[i]);
    var stat = fs.statSync(filename);

    if (filename == "." || filename == "..") {
      // pass these files
    } else if (stat.isDirectory()) {
      // rmdir recursively
      rmdir(filename);
    } else {
      // rm fiilename
      fs.unlinkSync(filename);
    }
  }
  fs.rmdirSync(dir);
}

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
    // {
    //   browserName: "firefox",
    // },
    // {
    //   browserName: "MicrosoftEdge",
    // },
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
    // timeout: 60000,
    timeout: 24 * 60 * 60 * 1000,
  },
  onPrepare: function (_config, _capabilities) {
    fs.chownSync(global.downloadDir, 1200, 1201);
  },
  onComplete: function () {
    fsExtra.emptyDirSync(global.downloadDir);
  },
};
