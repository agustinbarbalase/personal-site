const redis = require("redis");
require("dotenv").config();

let client;
(async () => {
  client = redis.createClient({
    url: process.env.REDIS_URL,
  });
  client.on("connect", () => console.log("Redis is connected"));
  await client.connect();
})();

module.exports = client;
