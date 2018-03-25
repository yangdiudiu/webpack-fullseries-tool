//以下postcss处理会增加 最少2-4秒的时间

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