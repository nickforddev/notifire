const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

module.exports = async function process_css(css) {
  try {
    const processed = await postcss([autoprefixer])
      .process(css)
    return processed
  } catch (error) {
    throw error
  }
}
