const webpack = require('webpack')

module.exports = function(options) {
  return {
    ...options,
    plugins: [
      ...options.plugins,
      new webpack.DefinePlugin({
        BUILD_DATE: JSON.stringify(new Date().toLocaleString()),
      }),
    ],
  }
}