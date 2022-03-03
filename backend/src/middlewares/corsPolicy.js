const cors = require("cors");
require("dotenv").config();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  `http://localhost:${process.env.PORT || 3001}`,
  process.env.VITE_BASE_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = { cors, corsOptions };