import { resolve } from 'path'
import fs from 'fs'
import { curry, compose } from 'ramda'

const cwd = process.cwd()
const configFile = resolve(cwd, '.minitee')
const defaults = { src: './templates', dest: '.' }
const fileContent = fs.existsSync(configFile)
  ? JSON.parse(fs.readFileSync(configFile, 'utf-8'))
  : {}

export const createConfig = curry(
  (defaultConfig, userConfig) => Object.assign({}, defaultConfig, userConfig)
)

export const updatePath = curry(
  (rootDir, config) => {
    return {
      ...config
    , src:  resolve(rootDir, config.src)
    , dest: resolve(rootDir, config.dest)
    }
  }
)

export default (compose(updatePath(cwd), createConfig(defaults))(fileContent))
