module.exports = {
  chainWebpack: config => {
    config.externals({
      'sharp': 'commonjs sharp'
    })
  }
}