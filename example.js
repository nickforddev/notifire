const fs = require('fs')
const inquirer = require('inquirer')

const setupExample = require('./src/js/server/example')

if (fs.existsSync('./data')) {
  const questions = [
    {
      type: 'confirm',
      name: 'verify',
      message: `It looks like you already have a project started, are you sure you want to overwrite it with an example project?`
    }
  ]
  inquirer.prompt(questions).then((answers) => {
    if (answers.verify) {
      setupExample()
    }
  })
} else {
  setupExample()
}
