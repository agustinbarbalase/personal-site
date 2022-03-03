const { Router } = require("express");
const fs = require("fs");
const githubReq = require("../lib/githubReq");
const { cors, corsOptions } = require("../middlewares/corsPolicy");
const router = Router();

router.get("/repos", cors(corsOptions), async (req, res) => {
  try {
    const { data } = await githubReq.listRepoForAUser("agustinbarbalase");
    res
      .status(200)
      .set({ "content-type": "application/json" })
      .send(
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

router.get("/contact", cors(corsOptions), (req, res) => {
  res
    .status(200)
    .set({ "content-type": "application/json" })
    .send(require("../lib/contactList"));
});

router.get("/license", (req, res) => {
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

module.exports = router;
