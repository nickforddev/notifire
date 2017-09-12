const email = require('sendmail')()
const utils = require('./index')
const inline = require('../inline')

module.exports = class Email {
  constructor(options) {
    return this.send(options)
  }
  async send(options) {
    const html = await inline(options.body)
    try {
      return utils.asyncCallback(email, {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html
      })
    } catch (error) {
      console.warn(error)
    }
  }
}
