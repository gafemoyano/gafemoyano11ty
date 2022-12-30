const htmlmin = require("html-minifier")
const { DateTime } = require("luxon")
const fs = require("fs")
const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const i18n = require("eleventy-plugin-i18n")
const translations = require("./src/_data/i18n")
const markdownItFootnote = require("markdown-it-footnote")

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight)
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      "*": "en",
    },
  })

  // Filters
  eleventyConfig.addShortcode("version", function () {
    return String(Date.now())
  })

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy")
  })

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
  })

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Build
  eleventyConfig.addPassthroughCopy("robots.txt")
  eleventyConfig.addPassthroughCopy("netlify.toml")
  eleventyConfig.addPassthroughCopy("src/assets/img")
  eleventyConfig.addPassthroughCopy("src/assets/fonts")
  eleventyConfig.addPassthroughCopy("src/assets/javascript")
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "node_modules/chartist/dist/chartist.min.css": "assets/chartist.min.css",
    "node_modules/chartist/dist/chartist.min.js": "assets/chartist.min.js",
  })

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
      })
      return minified
    }

    return content
  })

  // This allows Eleventy to watch for file changes during local development.
  eleventyConfig.setUseGitIgnore(false)

  // Plugin config

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#",
    })
    .use(markdownItFootnote)
  eleventyConfig.setLibrary("md", markdownLibrary)

  //Collections

  eleventyConfig.addCollection("englishPosts", function (collection) {
    return collection.getFilteredByGlob("./src/en/posts/*.md")
  })

  eleventyConfig.addCollection("spanishPosts", function (collection) {
    return collection.getFilteredByGlob("./src/es/posts/*.md")
  })

  eleventyConfig.addCollection("englishProjects", function (collection) {
    return collection.getFilteredByGlob("./src/en/projects/*.md")
  })

  eleventyConfig.addCollection("spanishProjects", function (collection) {
    return collection.getFilteredByGlob("./src/es/projects/*.md")
  })

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
    htmlTemplateEngine: "njk",
  }
}
