const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// 判断根目录
const BASE_URL = process.env.NODE_ENV === 'procution' ? '/' : './';
console.log("vue.config.js")
module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件，加快打包速度n
  productionSourceMap: false,
  devServer: {
    proxy: 'http://api.xmvogue.com'
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require('postcss-px-to-viewport')({
  //             viewportWidth: 1222, //根据视觉稿的宽度进行设置
  //             unitPrecision: 3,
  //             viewportUnit: 'vw',
  //             selectorBlackList: ['el'], //忽略转换的css选择器
  //             minPixelValue: 1,
  //             mediaQuery: true,
  //         }),
  //       ]
  //     }
  //   }
  // },
}
