# Notifire

> A tool for designing app-related emails, push notifications, and sms notifications

## Installation

``` bash
# install dependencies
npm install

# install an example project
npm run example

# run server
npm start
```

## Screenshot

![screenshot](/static/screenshot.png?raw=true)

## Getting Started

Create a new template or select an existing one, then click edit. This will open the relevant files in the editor, and render the template. Use `npm run example` to install an example project to get started.

## Templates

Templates are a group that represent a single notification, each containing an email, a push notification, and a text message. [http://handlebarsjs.com/expressions.html](http://handlebarsjs.com/expressions.html)

## Partials

Partials allow you to reuse components within your templates. [http://handlebarsjs.com/partials.html](http://handlebarsjs.com/partials.html)

## Globals

Globals are elements that are shared between all templates. Your global template will wrap every email template, global json will be available to every template, global styles will be applied to every template.