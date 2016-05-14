#!/usr/bin/env node

import program from 'commander'
import fm from 'front-matter'
import fs from 'fs'
import mkdirp from 'mkdirp'
import { blue, red, green, yellow, cyan } from 'chalk'
import { resolve } from 'path'

const infos   = (str, ...args) => console.log(blue(str), ...args)
const neutral = (str, ...args) => console.log(cyan(str), ...args)
const warning = (str, ...args) => console.log(yellow(str), ...args)
const error   = (str, ...args) => console.log(red(str), ...args)
const success = (str, ...args) => console.log(green(str), ...args)

const configFile = resolve(process.cwd(), '.minitee')
const defaults = { src: './templates', dest: '.' }
const config = fs.existsSync(configFile)
? Object.assign(
    {}
  , defaults
  , JSON.parse(fs.readFileSync(configFile, 'utf-8'))
  )
: defaults

const defaultInfos = { dest: '.' }
const srcDir = resolve(process.cwd(), config.src)
const destDir = resolve(process.cwd(), config.dest)

const extractAttr = ({attributes, body}) => {
  const reg = /\$\{(.*)\}/g
  const ff = attributes.filename.match(reg) || []
  const dd = attributes.dest.match(reg) || []

  let matches = body.match(reg)
  matches = (matches !== null)
  ? matches.concat(ff, dd)
  : [].concat(ff, dd)

  if(matches !== null)
    return Array.from(new Set(matches.map(x => /\$\{(.*)\}/.exec(x)[1])))
  else
    return []
}

const createParams = (file) => {
  const reg = /\.(?=[^.]*$)/
  const filename = file.split(reg)[0]
  const f = resolve(srcDir, file)
  const content = fs.readFileSync(f, 'utf-8')
  const data = fm(content)
  data.attributes = Object.assign(
    {}
  , defaultInfos
  , { filename: file }
  , data.attributes
  )
  const destination = resolve(destDir, data.attributes.dest)
  const attr = extractAttr(data)
  return {
    name: filename
  , src: f
  , destination
  , attr
  , isDir: fs.statSync(f).isDirectory()
  , ...data
  }
}
const parseData = (vv, attr, f, d) => {
  let filename = f
  let data = d
  attr.map(y => {
    if(vv[y] === undefined)
      warning("La variable '%s' n'as pas était fourni", y)
    const rr = new RegExp('\\$\\{' + y +'\\}', 'g')
    filename = filename.replace(rr, vv[y])
    data = data.replace(rr, vv[y])
  })
  return { filename, data }
}

const templateFiles = fs.readdirSync(srcDir)
const templates = templateFiles.map(createParams)

program
  .command('list')
  .action(() => {
    infos("List des templates:")
    templates.map(x => {
      infos("  %s", x.name)
      x.attr.map(y => neutral("    - %s", y))
    })
  })
program
  .arguments('<cmd> [args...]')
  .action((cmd, args)=> {
    let status = templates.reduce((x, y) => y.name === cmd || x, false)
    const targets = templates.filter(x => x.name.toUpperCase() === cmd.toUpperCase())
    const vv = args.reduce((x, y) => {
      const [a, b] = y.split(':')
      x[a] = b
      return x
    }, {})
    if(status){
      success("%s templates found", targets.length)
      targets.map(x => {
        const { filename, data } = parseData(vv, x.attr, `${x.destination}/${x.attributes.filename}`, x.body)
        mkdirp(x.destination
        , (err) => {
          fs.writeFile(filename, data
          , (err) => {
            console.log(green('file created at ') + cyan('%s'), filename)
          })
        })
      })
    }
    else{
      error("Error, the template doesn't exist.")
      return
    }
  })

program.parse(process.argv)
