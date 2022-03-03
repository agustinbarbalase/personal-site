const express = require("express");
const path = require("path");
const fs = require("fs");
const { createServer: createViteServer } = require("vite");

async function createServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use("/api", require("./routes/api.routes"));
  app.use("/public", express.static("public"));
  app.use(
    "/assets",
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
    try {
      const { render } = require("../../frontend/dist/server/entry-server");
      const appHtml = render(url, {});
      const html = template.replace(`<div id="app"></div>`, appHtml);
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
