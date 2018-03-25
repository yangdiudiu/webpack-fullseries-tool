const path = require('path');
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {
      url: "rebase",
      // assetsPath:'./statics',
    },
    "postcss-cssnext": {},
    "cssnano": {
      autoprefixer:false,
    }
  }
}