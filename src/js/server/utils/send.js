const email = require('sendmail')()
const utils = require('./index')

module.exports = class Email {
  constructor(options) {
    return this.send(options)
  }
  send(options) {
    try {
      return utils.asyncCallback(email, {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.body
      })
    } catch (error) {
      console.warn(error)
    }
  }
}
