// postcss.config.js
// Change: module.exports = {
  export default { // <-- This is the change you need to make
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  };