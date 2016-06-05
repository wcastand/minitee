import fs from 'fs'
import mkdirp from 'mkdirp'
import { join, resolve, relative, parse } from 'path'
import { red, blue, green, white, yellow } from 'chalk'

import { getConfig, extractAttr, getTemplateList } from './utils'

const cwd = process.cwd()

export default (cmd, args) => {
  const config = getConfig()
  const templates = getTemplateList()
  if(templates === null){
    console.log(red('Error, the template folder doesn\'t exist.'))
    console.log(yellow('You need to create one, or use the command "minitee init"'))
    console.log(yellow('Create a folder at : ') + blue(config.src))
  }
  else if(templates.length !== 0){
    const tmp = templates.filter(t => parse(t).name === cmd)
    if(tmp.length === 0)
      console.log(yellow('No template found with the name ') + blue(cmd))
    else{
      console.log(green('Files created:'))
      tmp.map(t => {
        const path = resolve(cwd, config.src, t)
        const content = fs.readFileSync(path, 'utf-8')
        let data = content
        args.map(y => {
          const d = y.split(':')
          const rr = new RegExp('\\$\\{' + d[0] +'\\}', 'g')
          data = data.replace(rr, d[1])
        })
        const r = /^\/\/\/--[\s]*(.*)$/gm
        data = data.split(r).slice(1)
        //files : Object
        //        path : content
        const files = {}
        for(let i = 0; i < data.length - 1; i+=2)
          files[data[i]] = data[i+1]
        Object.keys(files).map(filePath => {
          const fileInfos = parse(filePath)
          mkdirp(resolve(cwd, config.dest, fileInfos.dir), (err) => {
            if(err) console.log(red(err))
            else{
              const ff = resolve(cwd, config.dest, filePath)
              const content = files[filePath].replace(/^\s+/, '')
              fs.writeFileSync(ff, content, 'utf-8')
              console.log(blue('  ' + join(config.dest, filePath)))
            }
          })
        })
      })
    }
  }
  else
    console.log(yellow('No template found.'))
}
