const express = require("express");
const path = require("path");
const fs = require("fs");
const { createServer: createViteServer } = require("vite");
const client = require("./database");

async function createServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(
    "/api",
    require("./middlewares/cacheQuerys"),
    require("./routes/api.routes")
  );
  app.use(
    "/public",
    require("./middlewares/cacheFiles"),
    express.static("public")
  );
  app.use(
    "/assets",
    require("./middlewares/cacheFiles"),
    express.static(path.join(__dirname, "../../frontend/dist/client/assets"))
  );

  let vite;
  let template = fs.readFileSync(
    path.resolve(__dirname, "../../frontend/dist/client/index.html"),
    "utf-8"
  );
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: "ssr" },
    });
    app.use(vite.middlewares);
    template = await vite.transformIndexHtml(url, template);
  }

  app.use("*", async (req, res) => {
    const url = req.originalUrl;
    const reply = JSON.parse(await client.get(url)) || null;
    if (reply) {
      return res
        .status(200)
        .set({ "Content-Type": reply["Content-Type"] })
        .send(reply.content);
    }
    try {
      const { render } = require("../../frontend/dist/server/entry-server");
      const appHtml = render(url, {});
      const html = template.replace(`<div id="app"></div>`, appHtml);
      await client.set(
        url,
        JSON.stringify({ "Content-Type": "text/html", content: html })
      );
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        vite.ssrFixStacktrace(err);
      }
      res.status(500).end(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });
}

createServer();
