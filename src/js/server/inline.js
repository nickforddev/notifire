const _ = require('lodash')
const inliner = require('inline-css')
const defaults = {
  url: 'http://example.com'
}

module.exports = function inline(template_html, options = {}) {
  const merged_options = _.merge({}, defaults, options)
  try {
    const output = inliner(template_html, merged_options)
    return Promise.resolve(output)
  } catch (error) {
    return Promise.reject(error)
  }
}
