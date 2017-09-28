const { mkdir } = require('../utils')
const { ncp } = require('ncp')
const chalk = require('chalk')

module.exports = async () => {
  await mkdir('./data')
  ncp('./src/js/server/example/data', './data', (err) => {
    if (err) {
      console.red(chalk.red(err))
    } else {
      console.log(chalk.green('Successfully created example project'))
      console.log(chalk.green('Run npm start to continue'))
    }
  })
}
