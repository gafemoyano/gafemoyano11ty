const fs = require("fs")
const path = require("path")

module.exports = function () {
  const postsDir = "./src"

  const enPostsDir = path.join(postsDir, "en/posts")
  const esPostsDir = path.join(postsDir, "es/posts")

  const enPosts = fs.existsSync(enPostsDir)
    ? fs
        .readdirSync(enPostsDir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(".md", ""))
    : []

  const esPosts = fs.existsSync(esPostsDir)
    ? fs
        .readdirSync(esPostsDir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(".md", ""))
    : []

  const allSlugs = [...new Set([...enPosts, ...esPosts])]

  const map = {}
  allSlugs.forEach((slug) => {
    map[slug] = {
      en: enPosts.includes(slug),
      es: esPosts.includes(slug),
    }
  })

  return map
}
