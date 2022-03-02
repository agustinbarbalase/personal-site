const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const githubReq = require("./lib/githubReq");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3001;

var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  `http://localhost:${PORT}`,
  process.env.VITE_BASE_URL,
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.get("/api/repos", cors(corsOptions), async (req, res) => {
  try {
    const { data } = await githubReq.listRepoForAUser("agustinbarbalase");
    res.status(200).send(
      data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          url: item.svn_url,
        };
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.get("/license", (req, res) => {
  fs.readFile(path.join(__dirname, "../../LICENSE"), "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).end();
    }
    result = result
      .split("\r\n")
      .map((item) => {
        if (item !== "") return item;
      })
      .join("<br>");
    return res.status(200).send(result);
  });
});

app.use("/", express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/public", express.static("public"));

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
