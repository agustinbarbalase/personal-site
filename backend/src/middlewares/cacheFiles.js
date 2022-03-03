const fs = require("fs");
const path = require("path");
const getContentType = require("../lib/getContentType");
const client = require("../database");

const cacheQuerys = async (req, res, next) => {
  const reply = JSON.parse(await client.get(req.originalUrl)) || null;
  let result;
  const extension =
    req.originalUrl.split(".")[req.originalUrl.split(".").length - 1];
  if (reply) {
    return res
      .status(200)
      .set({ "Content-Type": reply["Content-Type"] })
      .send(reply.content);
  } else if (req.originalUrl.match("/assets")) {
    result = fs.readFileSync(
      path.join(__dirname, `../../../frontend/dist/client${req.originalUrl}`),
      "utf-8"
    );
  } else if (req.originalUrl.match("/public")) {
    result = fs.readFileSync(
      path.join(__dirname, `../..${req.originalUrl}`),
      "utf-8"
    );
  }
  await client.set(
    req.originalUrl,
    JSON.stringify({
      "Content-Type": getContentType(extension),
      content: result,
    })
  );
  next();
};

module.exports = cacheQuerys;
