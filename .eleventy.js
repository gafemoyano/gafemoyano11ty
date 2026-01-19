const htmlmin = require("html-minifier")
const { DateTime } = require("luxon")
const fs = require("fs")
const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const i18n = require("eleventy-plugin-i18n")
const { feedPlugin } = require("@11ty/eleventy-plugin-rss")
const translations = require("./src/_data/i18n")
const markdownItFootnote = require("markdown-it-footnote")
const Image = require("@11ty/eleventy-img")
const site = require("./src/_data/site")

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight)
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      "*": "en",
    },
  })

  eleventyConfig.addShortcode(
    "image",
    function (
      src,
      alt,
      widths = [400, 800, 1200],
      sizes = "(min-width: 768px) 50vw, 100vw",
    ) {
      let imageSrc = src.startsWith("/") ? "." + src : src
      let options = {
        widths: widths,
        formats: ["webp", "jpeg"],
        outputDir: "./_site/assets/img/",
        urlPath: "/assets/img/",
      }

      Image(imageSrc, options)
        .then((data) => {
          let largestImage = data.jpeg[data.jpeg.length - 1]
          return `<img src="${largestImage.url}" alt="${alt}" class="w-full h-auto" loading="lazy">`
        })
        .catch((err) => {
          console.error("Error generating image:", err)
          return `<img src="${src}" alt="${alt}" class="w-full h-auto" loading="lazy">`
        })
    },
  )

  eleventyConfig.addShortcode(
    "figure",
    async function (src, alt, caption = "") {
      try {
        let imageSrc = src.startsWith("/") ? "./src" + src : src
        let options = {
          widths: [800, 1200, 1600],
          formats: ["webp", "jpeg"],
          outputDir: "./_site/assets/img/",
          urlPath: "/assets/img/",
        }

        let data = await Image(imageSrc, options)
        let largestImage = data.jpeg[data.jpeg.length - 1]

        if (caption) {
          return `<figure class="my-8">
            <img src="${largestImage.url}" alt="${alt}" class="w-full h-auto rounded-lg shadow-md" loading="lazy">
            <figcaption class="mt-3 text-sm font-sans text-gray-600 italic text-center">${caption}</figcaption>
          </figure>`
        }
        return `<img src="${largestImage.url}" alt="${alt}" class="w-full h-auto rounded-lg shadow-md" loading="lazy">`
      } catch (err) {
        console.error("Error generating image:", err)
        if (caption) {
          return `<figure class="my-8">
            <img src="${src}" alt="${alt}" class="w-full h-auto rounded-lg shadow-md" loading="lazy">
            <figcaption class="mt-3 text-sm font-sans text-gray-600 italic text-center">${caption}</figcaption>
          </figure>`
        }
        return `<img src="${src}" alt="${alt}" class="w-full h-auto rounded-lg shadow-md" loading="lazy">`
      }
    },
  )

  eleventyConfig.addShortcode(
    "video",
    function (src, poster = "", caption = "") {
      let videoHtml = `<video controls class="h-[50vh] w-full rounded-lg shadow-md" ${poster ? `poster="${poster}"` : ""}>
      <source src="${src}" type="video/mp4">
    </video>`

      if (caption) {
        return `<figure class="my-8">
        ${videoHtml}
        <figcaption class="mt-3 text-sm font-sans text-gray-600 italic text-center">${caption}</figcaption>
      </figure>`
      }
      return videoHtml
    },
  )

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
  eleventyConfig.addPassthroughCopy("src/assets/videos")
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
      permalink: markdownItAnchor.permalink.headerLink(),
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

  // Feed collections exclude external posts (permalink: false breaks RSS)
  eleventyConfig.addCollection("englishPostsFeed", function (collection) {
    return collection
      .getFilteredByGlob("./src/en/posts/*.md")
      .filter((post) => !post.data.external_url)
  })

  eleventyConfig.addCollection("spanishPostsFeed", function (collection) {
    return collection
      .getFilteredByGlob("./src/es/posts/*.md")
      .filter((post) => !post.data.external_url)
  })

  eleventyConfig.addCollection("englishProjects", function (collection) {
    return collection.getFilteredByGlob("./src/en/projects/*.md")
  })

  eleventyConfig.addCollection("spanishProjects", function (collection) {
    return collection.getFilteredByGlob("./src/es/projects/*.md")
  })

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/en/feed.xml",
    collection: {
      name: "englishPostsFeed",
      limit: 0,
    },
    metadata: {
      language: "en",
      title: `${site.title} - English Blog`,
      subtitle: site.description,
      base: site.url,
      author: {
        name: site.author,
      },
    },
  })

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/es/feed.xml",
    collection: {
      name: "spanishPostsFeed",
      limit: 0,
    },
    metadata: {
      language: "es",
      title: `${site.title} - Blog en Español`,
      subtitle: site.description,
      base: site.url,
      author: {
        name: site.author,
      },
    },
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
