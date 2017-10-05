const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const utils = require('./src/js/server/utils')
const Email = require('./src/js/server/utils/send')
const port = '36361'

console.warn = () => {}

// Server

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.listen(port)

// Endpoints

app.get('/data', async (req, res) => {
  let output = {}
  const dirs = {
    templates: 'data/templates/',
    partials: 'data/partials/',
    styles: 'data/styles/',
    globals: 'data/globals/'
  }

  for (let key in dirs) {
    output[key] = await utils.getFilesData(dirs[key])
  }

  res.send(output)
})

app.get('/*', async (req, res) => {
  const path = req.originalUrl
  res.sendFile(`data/${path}`, {
    root: __dirname
  })
})

app.put('/*', (req, res) => {
  const path = req.originalUrl.slice(1)
  fs.writeFile(`data/${path}`, req.body.content, (error) => {
    console.warn(error)
    error
      ? res.status(500).send('Could not save')
      : res.send('Saved successfully')
  })
})

app.post('/templates', async (req, res) => {
  try {
    const template_name = req.body.name
    const message = await utils.createTemplate(template_name)
    res.send(message)
  } catch (error) {
    console.warn(error)
    res.status(500).send(error.message)
  }
})

app.delete('/templates/:name', async (req, res) => {
  try {
    const name = req.params.name
    const message = await utils.removeTemplate(name)
    res.send(message)
  } catch (error) {
    console.warn(error)
    res.status(500).send(error.message)
  }
})

app.post('/styles', async (req, res) => {
  try {
    const name = req.body.name
    const message = await utils.createStylesheet(name)
    res.send(message)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.delete('/styles/:name', async (req, res) => {
  try {
    const name = req.params.name
    const message = await utils.removeStylesheet(name)
    res.send(message)
  } catch (error) {
    console.warn(error)
    res.status(500).send(error.message)
  }
})

app.post('/partials', async (req, res) => {
  try {
    const name = req.body.name
    const message = await utils.createPartial(name)
    res.send(message)
  } catch (error) {
    console.warn(error)
    res.status(500).send(error.message)
  }
})

app.delete('/partials/:name', async (req, res) => {
  try {
    const name = req.params.name
    const message = await utils.removePartial(name)
    res.send(message)
  } catch (error) {
    console.warn(error)
    res.status(500).send(error.message)
  }
})

app.post('/render/email', async (req, res) => {
  try {
    const path = req.body.path
    if (path === false) {
      throw new Error('Please select a template to render')
    }
    // need to remove /email from end of path
    const template_path = path.split('/').slice(0, -1).join('/')
    const html = await utils.renderEmail(template_path)

    res.send(html)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

app.post('/render/push', async (req, res) => {
  try {
    const path = req.body.path
    if (path === false) {
      throw new Error('Please select a template to render')
    }
    // need to remove /email from end of path
    const template_path = path.split('/').slice(0, -1).join('/')
    const html = await utils.renderPush(template_path)

    res.send(html)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

app.post('/render/text', async (req, res) => {
  try {
    const path = req.body.path
    // need to remove /email from end of path
    const template_path = path.split('/').slice(0, -1).join('/')
    const html = await utils.renderText(template_path)

    res.send(html)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

app.post('/render/false', (req, res) => {
  const message = 'Rendering this type of file is not currently supported. Please select from the templates section if you want to render something.'
  return res.status(500).send(message)
})

app.post('/build', async (req, res) => {
  try {
    const build = require('./build-utils')
    const message = await build('./data')
    res.send(message)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/send', async (req, res) => {
  try {
    const options = req.body
    const msg = await new Email(options)
    res.send(msg)
  } catch (error) {
    res.status(500).send(error)
  }
})

console.log(`Listening on port ${port}`)
