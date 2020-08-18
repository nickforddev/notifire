const _ = require('lodash')
const inliner = require('inline-css')
const defaults = {
  url: 'http://example.com'
}

module.exports = async function inline(template_html, options = {}) {
  const merged_options = _.merge({}, defaults, options)
  try {
    const output = inliner(template_html, merged_options)
    return output
  } catch (error) {
    throw error
  }
}
