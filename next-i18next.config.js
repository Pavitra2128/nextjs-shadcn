// next-i18next.config.js
const path=require('path');
module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'hi', 'te'],
    },
    localePath: path.resolve('./public/locales'),
  };
  