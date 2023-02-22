const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
})

module.exports = {
  env: {
    // PRODUCTION
    // BASE_API: 'https://creatorsapi.leozin.dev',
    // DEVELOPMENT
    BASE_API: 'http://127.0.0.1:3333',
  },
  images: {
    domains: [
      'ui-avatars.com',
      '51.79.86.40',
      '127.0.0.1',
      'creatorsapi.leozin.dev',
    ],
  },
}
