const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // eleventyConfig.addPassthroughCopy("./src/assets/styles");

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/javascript");
  eleventyConfig.addPassthroughCopy({
    "node_modules/chartist/dist/chartist.min.css": "assets/chartist.min.css",
    "node_modules/chartist/dist/chartist.min.js": "assets/chartist.min.js",
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // This allows Eleventy to watch for file changes during local development.
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
      includes: "_includes",
    },
    templateFormats: ["md", "njk", "html"],
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
