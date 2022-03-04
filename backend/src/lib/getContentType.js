const LIST_CONTENT_TYPE = {
  js: "text/javascript",
  css: "text/css",
  svg: "image/svg+xml",
  html: "text/html",
  jpg: "image/jpeg"
};

module.exports = (extension) => {
  return LIST_CONTENT_TYPE[extension] || null;
};
