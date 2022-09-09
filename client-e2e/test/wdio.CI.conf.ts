// config for Github workflow to run

import type { Options } from "@wdio/types";
import { execSync } from "child_process";
import * as fs from "fs";
import * as fsExtra from "fs-extra";

import {ReportAggregator, HtmlReporter} from 'wdio-html-nice-reporter';
import commands from "@rpii/wdio-commands";
import {String, StringBuilder} from 'typescript-string-operations';

let reportAggregator: ReportAggregator;
var log4js = require("log4js");

global.downloadDirBrowser = "/home/seluser/downloads";
global.downloadDir = "/home/node/downloads";

export const config: Options.Testrunner = {
  hostname: "selenium-hub",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "test/tsconfig.json",
    },
  },
  //specs: ["./test/specs/**/*.ts"],
  specs: ["./test/specs/receive.ts"],
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
      "moz:firefoxOptions": {
        prefs: {
          "browser.download.dir": global.downloadDirBrowser,
          "browser.download.folderList": 2,
        },
      },
    },
    {
      browserName: "MicrosoftEdge",
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
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  //reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  onPrepare: function (config, capabilities) {
    execSync("/usr/src/app/scripts/generate-CI-test-files.sh");
    reportAggregator = new ReportAggregator({
            outputDir: './reports/html-reports/',
            filename: 'master-report.html',
            reportTitle: 'Master Report',
            browserName: capabilities.browserName,
            collapseTests: true
          });
        reportAggregator.clean();
  },
  before: function (capabilities, specs) {

        //@ts-ignore
        commands.addCommands(driver);
  },
  beforeTest: function () {
    fsExtra.emptyDirSync(global.downloadDir);
  },
  afterTest: function (test: any, context: any, result: any) {
        // if test passed, ignore, else take and save screenshot.
        if (result.passed) {
            return;
        }
        //@ts-ignore
        driver.logScreenshot(String.Format("Test Ended in {0}", result.error.stack));
  },
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'E2E tests report',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: false,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false,

            //to initialize the logger
            LOG: log4js.getLogger("default")
        }
        ]
  ],
  onComplete: function(exitCode, config, capabilities, results) {
        (async () => {
            await reportAggregator.createReport();
        })();
  },
};
