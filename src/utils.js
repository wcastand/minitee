import { resolve } from 'path'
import fs from 'fs'
import fm from 'front-matter'
import { curry } from 'ramda'


import { warning } from './console'
import config from './config'

const extractAttr = curry(
  ({attributes, body}) => {
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
)

const createParams = curry(
  (config, file) => {
    const reg = /\.(?=[^.]*$)/
    const filename = file.split(reg)[0]
    const f = resolve(config.src, file)
    const content = fs.readFileSync(f, 'utf-8')
    const data = fm(content)
    data.attributes = {
      dest: config.dest
    , filename: file
    , ...data.attributes
    }

    return {
      name: filename
    , src: f
    , destination: data.attributes.dest !== undefined
      ? resolve(config.dest, data.attributes.dest)
      : config.dest
    , attr: extractAttr(data)
    , isDir: fs.statSync(f).isDirectory()
    , ...data
    }
  }
)

if(!fs.existsSync(config.src))
  fs.mkdirSync(config.src)
const templateFiles = fs.readdirSync(config.src)
const basicParams = createParams(config)

export const templates = templateFiles.map(basicParams)
export const parseData = curry(
  (vv, attr, f, d) => {
    let filename = f
    let data = d
    attr.map(y => {
      if(vv[y] === undefined)
        return warning("La variable '%s' n'as pas était fourni", y)
      const rr = new RegExp('\\$\\{' + y +'\\}', 'g')
      filename = filename.replace(rr, vv[y])
      data = data.replace(rr, vv[y])
    })
    return { filename, data }
  }
)
