import fs from 'fs'
import { resolve } from 'path'

const cwd = process.cwd()
const configFile = resolve(cwd, '.minitee')
const defaults = { src: './templates', dest: '.' }

export const getConfig = () => {
  return fs.existsSync(configFile)
  ? JSON.parse(fs.readFileSync(configFile, 'utf-8'))
  : defaults
}

export const extractAttr = (body) => {
  const reg = /\$\{(.*?)\}/g
  const matches = body.match(reg)

  return matches !== null
  ? Array.from(new Set(matches.map(x => /\$\{(.*)\}/.exec(x)[1])))
  : []
}

export const getTemplateList = () => {
  const config = getConfig()

  if (fs.existsSync(resolve(cwd, config.src)))
    return fs.readdirSync(resolve(cwd, config.src))
  else
    return null
}
