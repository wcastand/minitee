import { resolve } from 'path'
import fs from 'fs'
import { curry, compose } from 'ramda'

const configFile = resolve(process.cwd(), '.minitee')
const defaults = { src: './templates', dest: '.' }
const fileContent = fs.existsSync(configFile)
  ? JSON.parse(fs.readFileSync(configFile, 'utf-8')) : {}

const createConfig = curry(
  (defaultConfig, userConfig) => Object.assign({}, defaultConfig, userConfig)
)(defaults)

const updatePath = curry(
  (rootDir, config) => {
    return {
      ...config
    , src:  resolve(rootDir, config.src)
    , dest: resolve(rootDir, config.dest)
    }
  }
)(process.cwd())

export default compose(updatePath, createConfig)(fileContent)
