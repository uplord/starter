// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    buildAssetsDir: "/nuxt/",
    head: {
      script: [
        {
          src: "/scripts/script.js"
        }
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  css: [
    '~/styles/main.scss',
  ],
  devtools: { enabled: true },
  googleFonts: {
    families: {
      "DM Sans": [400, 500, 600, 700]
    },
    display: "swap"
  },
  image: {
    provider: 'ipx',
    strapi: {
      baseURL: process.env.STRAPI_URL || 'http://localhost:1337'
    },
  },
  modules: [
    "nuxt-icons",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/strapi",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      strapiApiKey: process.env.STRAPI_API_KEY,
      strapiApiUrl: process.env.STRAPI_API_URL || 'http://localhost:1337/api',
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
      devMode: process.env.DEV_MODE || 'false',
    },
  },
  srcDir: "src/",
  ssr: false,
})
