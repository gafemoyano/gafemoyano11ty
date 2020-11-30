module.exports = {
  title: "Felipe Moyano",
  description:
    "This site will serve both as a learning experience and as a playground to try out new things and share my thoughts along the way",
  url:
    process.env.ELEVENTY_ENV === "production"
      ? "https://gafemoyano.com"
      : "http://localhost:8080",
  baseUrl: "/",
  author: "Felipe Moyano",
  authorTwitter: "@gafemoyano",
  buildTime: new Date(),
  languages: [
    {
      label: "english",
      code: "en",
    },
    {
      label: "español",
      code: "es",
    },
  ],
  environment: process.env.ELEVENTY_ENV,
}
