import fs from 'fs'
import { parse, resolve } from 'path'
import { red, blue, green, white, yellow, magenta } from 'chalk'

import { getConfig, extractAttr, getTemplateList } from './utils'

const cwd = process.cwd()

export default (options) => {
  const config = getConfig()
  const templates = getTemplateList()
  if(templates === null){
    console.log(red('Error, the template folder doesn\'t exist.'))
    console.log(yellow('You need to create one, or use the command "minitee init"'))
    console.log(yellow('Create a folder at : ') + blue(config.src))
  }
  else if(templates.length !== 0){
    console.log(red.underline.bold('Templates:'))
    console.log('')
    console.log(
      green.bold('  name')
    + blue(' (filename)')
    +  (options.all !== undefined ? yellow(' ( attributes )') : '')
    )
    console.log(white('  ------------------------------------------------------'))
    templates.map(file => {
      const content = fs.readFileSync(resolve(cwd, config.src, file), 'utf-8')
      const attrs = extractAttr(content).join(', ')
      console.log(
        green.bold('  ' + parse(file).name)
      + blue(' (' + parse(file).base + ') ')
      + (options.all !== undefined ? yellow('( ' + attrs + ' )') : '')
      )
    })
  }
  else
    console.log(yellow('No template found.'))
}
