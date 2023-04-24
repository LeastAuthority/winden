import fetch from "node-fetch";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

(async () => {
  console.log("Waiting for webpack to compile...");
  while (true) {
    await sleep(1000);
    const response = await fetch("https://localhost:8080/bundle-status", {
      agent,
    });
    process.stdout.write(".");
    const result = await response.text();
    if (result.includes("true")) {
      break;
    }
  }
  console.log("Webpack compiled successfully.");
})();
