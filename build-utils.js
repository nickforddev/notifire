const chalk = require('chalk')

const utils = require('./src/js/server/utils')
const preprocess = require('./src/js/server/preprocess')
const inline = require('./src/js/server/inline')

async function buildTemplate(template_path, global_css, output_path) {
  const template_name = template_path.split('/').slice(-1)
  await buildEmail(template_path, global_css, output_path)
  await buildPush(template_path, global_css, output_path)
  await buildText(template_path, global_css, output_path)
  const json = await utils.readFile(`${template_path}/data.json`)
  await utils.writeFile(`./dist/templates/${template_name}/data.json`, json)
}

async function buildEmail(template_path, global_css, output_path) {
  const name = template_path.split('/').slice(-1)
  const template = await utils.readFile(`${template_path}/email/index.html`)
  const trimmed_template = await utils.trimTemplate(template)

  if (trimmed_template) {
    const subject = await utils.readFile(`${template_path}/email/subject.html`)
    const scss = await utils.readFile(`${template_path}/email/style.scss`) || '//'
    const css = await preprocess(scss)
    let template_inlined = await inline(template, {
      extraCss: global_css
    })
    template_inlined = await inline(template_inlined, {
      extraCss: css,
      removeHtmlSelectors: true
    })
    await utils.mkdir(`${output_path}/templates/${name}/email`)
    await utils.writeFile(`${output_path}/templates/${name}/email/index.html`, template_inlined)
    await utils.writeFile(`${output_path}/templates/${name}/email/subject.html`, subject)
  }
}

async function buildPush(template_path, global_css, output_path) {
  const name = template_path.split('/').slice(-1)
  const template = await utils.readFile(`${template_path}/push/index.html`)
  const trimmed_template = await utils.trimTemplate(template)
  if (trimmed_template) {
    await utils.mkdir(`${output_path}/templates/${name}/push`)
    await utils.writeFile(`${output_path}/templates/${name}/push/index.html`, template)
  }
}

async function buildText(template_path, global_css, output_path) {
  const name = template_path.split('/').slice(-1)
  const template = await utils.readFile(`${template_path}/text/index.html`)
  const trimmed_template = await utils.trimTemplate(template)
  if (trimmed_template) {
    await utils.mkdir(`${output_path}/templates/${name}/text`)
    await utils.writeFile(`${output_path}/templates/${name}/text/index.html`, template)
  }
}

async function buildPartial(partial_path, global_css, output_path) {
  const name = partial_path.split('/').slice(-1)
  const partial_template = await utils.readFile(`${partial_path}/index.html`)
  const partial_scss = await utils.readFile(`${partial_path}/style.scss`) || '//'
  const partial_css = await preprocess(partial_scss)
  let partial_template_inlined = await inline(partial_template, {
    extraCss: global_css
  })
  partial_template_inlined = await inline(partial_template, {
    extraCss: partial_css,
    removeHtmlSelectors: true
  })
  await utils.mkdir(`${output_path}/partials/${name}`)
  await utils.writeFile(`${output_path}/partials/${name}/index.html`, partial_template_inlined)
}

async function build(path = '', output_path = './dist') {
  try {
    const template_paths = await utils.readdirPaths(`${path}/templates`)
    const partial_paths = await utils.readdirPaths(`${path}/partials`)

    const global_template = await utils.readFile(`${path}/globals/index.html`)
    const global_scss = await utils.readFile(`${path}/globals/globals.scss`) || '//'
    const global_css = await preprocess(global_scss)
    const global_json = await utils.readFile(`${path}/globals/globals.json`)

    const inlined_global_template = await inline(global_template, {
      extraCss: global_css
    })

    await utils.rmrf(output_path)
    await utils.mkdir(`${output_path}/globals/`)

    await utils.writeFile(`${output_path}/globals/index.html`, inlined_global_template)
    await utils.writeFile(`${output_path}/globals/globals.json`, global_json)

    for (let partial_path of partial_paths) {
      await buildPartial(partial_path, global_css, output_path)
    }

    for (let template_path of template_paths) {
      await buildTemplate(template_path, global_css, output_path)
    }
    const message = `Built ${template_paths.length} templates, ${partial_paths.length} partials  successfully`
    console.log(chalk.green(message))
    return Promise.resolve(message)
  } catch (error) {
    console.warn(chalk.red(error))
    return Promise.reject(error)
  }
}

module.exports = build
