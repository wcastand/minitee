import mkdirp from 'mkdirp'
import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { blue, green, white } from 'chalk'

export default (options) => {
  console.log(blue('Initialization...'))
  console.log('')

  const base_dir = process.cwd()
  const src = options.src !== undefined ? options.src : './templates'
  const dest = options.dest !== undefined ? options.dest : '.'
  const config = { src, dest }

  console.log(blue('Create template folder at :'))
  console.log('  ' + white(resolve(base_dir, src)))
  console.log('')
  mkdirp(resolve(base_dir, src))

  console.log(blue('Create config file at :'))
  console.log('  ' + white(resolve(base_dir, './.minitee')))
  console.log('')
  writeFileSync(resolve(base_dir, './.minitee'), JSON.stringify(config), 'utf-8')

  console.log(green('Initialization complete.'))
}
