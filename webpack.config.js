const path = require("path");

module.exports = {
  entry: [
    "./js/data.js",
    "./js/backend.js",
    "./js/popap-template.js",
    "./js/filter.js",
    "./js/picture.js",
    "./js/preview.js",
    "./js/banner-server-error.js",
    "./js/loading.js",
    "./js/slaider.js",
    "./js/change.js",
    "./js/effect.js",
    "./js/validation.js",
    "./js/debounce.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
