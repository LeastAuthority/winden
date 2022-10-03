import * as crypto from "crypto";
import * as fs from "fs";

export function hashFile(file: string) {
  return new Promise((res) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(file);

    stream.on("data", (data: string) => {
      hash.update(data, "utf8");
    });

    stream.on("end", () => {
      res(hash.digest("hex"));
    });
  });
}
