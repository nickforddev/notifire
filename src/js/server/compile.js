const hogan = require('hogan.js')

module.exports = async function compile(template, data, partials) {
  try {
    const compiled = hogan.compile(template)
    const args = [ data ]
    if (partials !== undefined) args.push(partials)
    const html = compiled.render(...args)
    // return Promise.resolve(html)
    return html
  } catch (error) {
    throw error
    // return Promise.reject(error)
  }
}
