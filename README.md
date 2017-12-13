# Notifire

[![Build](https://travis-ci.org/nickforddesign/notifire.svg?branch=master)](#)
[![Coverage Status](https://coveralls.io/repos/github/nickforddesign/notifire/badge.svg?branch=master)](https://coveralls.io/github/nickforddesign/notifire?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> A tool for designing app-related emails, push notifications, and sms notifications using mustache templates and sass/scss.

## Installation

``` bash
# clone repository (or download it)
git clone https://github.com/nickforddesign/notifire && cd notifire

# install dependencies
npm install

# install an example project
npm run example

# run server
npm start
```

## Screenshot

![screenshot](/static/screenshot.jpg?raw=true)

## Getting Started

Create a new template or select an existing one, then click edit. This will open the relevant files in the editor, and render the template. Use `npm run example` to install an example project to get started.

## Templates

Templates are a group that represent a single notification, each containing an email, a push notification, and a text message. All templates should be in mustache formatting, and are rendered using Hogan.js. Global and template-specific json files should be used as a means of mocking data that your production app will later provide. [https://mustache.github.io/](https://mustache.github.io/)

## Styles

Styles are rendered using node-sass (css/sass/scss all supported), and are first scoped to individual templates/partials, then global templates. This means that stylesheets for specific templates will never affect elements outside of that particular template. All styles will be autoprefixed and inlined during build.

## Partials

Partials allow you to reuse components within your templates. [https://mustache.github.io/](https://mustache.github.io/)

## Globals

Globals are elements that are shared between all templates. Your global template will wrap every email template, global json will be available to every template, global styles will be applied to every template.

## Build

When you are ready to export your templates for use in production, click the build button. This will render all templates with autoprefixed and inlined css to the ./dist folder, at which point your templates are ready to send!