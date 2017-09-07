const hogan = require('hogan.js')

module.exports = function compile(template, data, partials) {
  try {
    const compiled = hogan.compile(template)
    const args = [ data ]
    if (partials !== undefined) args.push(partials)
    const html = compiled.render(...args)
    return Promise.resolve(html)
  } catch (error) {
    // console.log('caught compilation error', error)
    return Promise.reject(error)
  }
}
