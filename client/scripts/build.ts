import fs from "fs-extra";
import path from "path";
import util from "util";
import webpack from "webpack";
import { program } from "commander";
import { execSync } from "child_process";

require("dotenv").config();

const webpackConfig = require("../webpack.config.js");
const packageJson = JSON.parse(fs.readFileSync("./package.json").toString());

program.option("--deploy");
program.parse();
const options = program.opts();

(async () => {
  try {
    await fs.rm(path.join(__dirname, "../dist", ""), {
      recursive: true,
      force: true,
    });
    await fs.copy(
      path.join(__dirname, "../src/public"),
      path.join(__dirname, "../dist", "")
    );
    await util.promisify(webpack)(webpackConfig);

    if (options.deploy) {
      console.log("deploying");
      // Add version to title of index.html
      {
        const filePath = path.join(__dirname, "../dist/index.html");
        const content = await fs.readFile(filePath, "utf-8");
        const replaced = content.replace(
          new RegExp(`<title>(.*)</title>`),
          "<title>$1 (" + packageJson.version + ")</title>"
        );
        await fs.writeFile(filePath, replaced, "utf-8");
      }
      // Modify robots.txt
      {
        const filePath = path.join(__dirname, "../dist/robots.txt");
        const content = await fs.readFile(filePath, "utf-8");
        const replaced = content.replace("Disallow", "Allow");
        await fs.writeFile(filePath, replaced, "utf-8");
      }

      // begin deployment
      // accept ssh host key of target
      execSync("mkdir -p ~/.ssh");
      execSync(
        `ssh-keyscan ${process.env.SFTP_HOSTNAME} > ~/.ssh/known_hosts 2>/dev/null`
      );
      fs.writeFileSync(
        path.join(process.env.HOME!, "/.ssh/id_ed25519"),
        process.env.SFTP_IDENTITY!,
        { mode: 0o600 }
      );

      // transfer files
      let environment = process.env.ENVIRONMENT ?? process.env.NODE_ENV;
      console.info(
        `Using environment: ${environment} (NODE_ENV: ${process.env.NODE_ENV}, ENVIRONMENT: ${process.env.ENVIRONMENT})`
      );
      execSync(
        `lftp sftp://${process.env.SFTP_USERNAME}:dummy@${process.env.SFTP_HOSTNAME}`,
        {
          input: `mirror -R dist winden_${environment}`,
        }
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
