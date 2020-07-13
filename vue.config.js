const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 目录设置
  chainWebpack(config) {
    // 进入components目录就相当于进入src/components目录
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'))
  }
}
