const client = require("../database");
require("dotenv").config();

const cacheQuerys = async (req, res, next) => {
  const reply = await client.get(`${process.env.NODE_ENV};${req.originalUrl}`);
  if (reply) {
    return res.status(200).send(reply);
  } else {
    next();
  }
};

module.exports = cacheQuerys;
