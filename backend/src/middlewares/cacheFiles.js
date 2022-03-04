const fs = require("fs/promises");
const path = require("path");
const getContentType = require("../lib/getContentType");
const client = require("../database");
require("dotenv").config();

const cacheQuerys = async (req, res, next) => {
  try {
    const reply =
      JSON.parse(
        await client.get(`${process.env.NODE_ENV};${req.originalUrl}`)
      ) || null;
    let pathFile;
    let result;
    const extension =
      req.originalUrl.split(".")[req.originalUrl.split(".").length - 1];

    if (extension === "jpg") {
      return next();
    }

    if (reply) {
      return res
        .status(200)
        .set({
          "Content-Type": reply["Content-Type"],
        })
        .send(reply.content);
    } else if (req.originalUrl.match("/assets")) {
      pathFile = path.join(
        __dirname,
        `../../../frontend/dist/client${req.originalUrl}`
      );
    } else if (req.originalUrl.match("/public")) {
      pathFile = path.join(__dirname, `../..${req.originalUrl}`);
    }

    result = await fs.readFile(pathFile, "utf8");
    await client.set(
      `${process.env.NODE_ENV};${req.originalUrl}`,
      JSON.stringify({
        "Content-Type": getContentType(extension),
        content: result,
      }),
      {
        EX: 60 * 60,
      }
    );
    next();
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.status(404).send({
        message: `File ${req.originalUrl} not found`,
      });
    }
    if (err) return res.status(500).end();
    console.error(err);
  }
};

module.exports = cacheQuerys;
