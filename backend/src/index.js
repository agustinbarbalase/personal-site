const express = require("express");
const path = require("path");
const fs = require("fs");
const { createServer: createViteServer } = require("vite");

async function createServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use("/api", require("./routes/api.routes"));
  app.use("/public", express.static("public"));
  app.use("/assets", express.static(path.join(__dirname, "../../frontend/dist/client/assets")));

  let vite;
  if(process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: "ssr" },
    });
    app.use(vite.middlewares);
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "../../frontend/dist/client/index.html"),
        "utf-8"
      );
      template = await vite.transformIndexHtml(url, template);
      const { render } = require("../../frontend/dist/server/entry-server");
      const appHtml = render(url, {});
      const html = template.replace(`<div id="app"></div>`, appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if(process.env.NODE_ENV !== "production") {
        vite.ssrFixStacktrace(e);
      }
      res.status(500).end(e);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });
}

createServer();
