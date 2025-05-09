// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // target: 'static',
  app: {
    baseURL: '/kintanr.github.io/',
  },


  nitro: {
    preset: 'static',
    output: {
      dir: '.output'
    }
  },

  css: [ '~/assets/css/styles.css', 'swiper/css'],
  
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    'v-gsap-nuxt',
    '@nuxt/ui'
  ],

  vgsap: {
    composable: true,
    presets: [],      // Kosongkan agar tidak override
    breakpoint: 768,  // Default
    scroller: '',
  }
})

