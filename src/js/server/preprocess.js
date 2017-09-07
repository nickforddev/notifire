const sass = require('node-sass')

module.exports = function preprocess (data) {
  try {
    const { css } = sass.renderSync({
      data,
      includePaths: [
        './data/styles/'
      ]
    })
    const output = css.toString()
    return Promise.resolve(output)
  } catch (error) {
    return Promise.reject(error)
  }
}
