const secret = process.env.HOOK_SECRET;
const repo = process.env.HOOK_PATH_TO_REPO;
const port = process.env.HOOK_PORT;

const http = require("http");
const crypto = require("crypto");
const exec = require("child_process").exec;

const PM2_CMD = "pm2 reload back";

http
  .createServer(function (req, res) {
    req.on("data", function (chunk) {
      let sig =
        "sha1=" +
        crypto
          .createHmac("sha1", secret)
          .update(chunk.toString())
          .digest("hex");

      if (req.headers["x-hub-signature"] == sig) {
        exec(
          `cd ${repo} && git pull && ${PM2_CMD}`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          }
        );
      }
    });

    res.end();
  })
  .listen(port);
