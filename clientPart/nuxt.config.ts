export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'light', // Установите значение по умолчанию
      },
    },
  },

  imports: {
    dirs: ['config']
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    "nuxt-viewport",
    'nuxt-swiper',
  ],

  plugins: [
    { src: '~/plugins/vue-the-mask.ts' },
  ],

  viewport: {
    breakpoints: {
      desktop: 1024,
      desktopMedium: 1280,
      desktopWide: 1600,

      mobile: 320,
      mobileMedium: 427,
      mobileWide: 577,

      tablet: 769,
    },
  },

  pwa: {
    manifest: {
      name: 'Pizzeria',
      short_name: 'Pizzeria',
      description: "Pizzeria nuxt pwa application",
      lang: 'ru',
      theme_color: '#fcfcfd',

      icons: [
        {
          src: "icons/icon_64x64.png",
          sizes: "64x64",
          type: "image/png",

        },
        {
          src: "icons/icon_120x120.png",
          sizes: "120x120",
          type: "image/png",

        },
        {
          src: "icons/icon_144x144.png",
          sizes: "144x144",
          type: "image/png",

        },
        {
          src: "icons/icon_152x152.png",
          sizes: "152x152",
          type: "image/png",

        },
        {
          src: "icons/icon_192x192.png",
          sizes: "192x192",
          type: "image/png",

        },
        {
          src: "icons/icon_384x384.png",
          sizes: "384x384",
          type: "image/png",

        },
        {
          src: "icons/icon_512x512.png",
          sizes: "512x512",
          type: "image/png",

        }
      ],
    },

    workbox: {
      navigateFallback: '/'
    },

    devOptions: {
      enabled: true,
      type: "module"
    }
  },

  css: [
    "~/assets/styles/_colors.scss",
    "~/assets/styles/_fonts.scss",
    "~/assets/styles/_main.scss",
    'vue-datepicker-next/index.css',
  ],

  image: {
    screens: {
      'xs': 425,
      'sm': 576,
      'md': 768,
      'lg': 992,
      'xl': 1136,
      'xxl': 1440,
    },
  },

  swiper: {

    modules: ['pagination'],
    // modules: [], // all modules are imported by default
  },

})