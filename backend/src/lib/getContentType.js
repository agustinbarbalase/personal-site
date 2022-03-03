const LIST_CONTENT_TYPE = {
  js: "text/javascript",
  css: "text/css",
  svg: "image/svg+xml",
  html: "text/html",
};

module.exports = (extension) => {
  return LIST_CONTENT_TYPE[extension] || null;
};
