const sass = require('node-sass')

module.exports = async function preprocess (data) {
  try {
    const { css } = sass.renderSync({
      data,
      includePaths: [
        './data/styles/'
      ]
    })
    return css.toString()
  } catch (error) {
    throw error
  }
}
