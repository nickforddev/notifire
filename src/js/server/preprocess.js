const sass = require('node-sass')

module.exports = async function preprocess (data) {
  try {
    const { css } = sass.renderSync({
      data,
      includePaths: [
        './data/styles/'
      ]
    })
    const output = css.toString()
    return output
    // return Promise.resolve(output)
  } catch (error) {
    throw error
    // return Promise.reject(error)
  }
}
