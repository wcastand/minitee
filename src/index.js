#!/usr/bin/env node
import program from 'commander'

import init from './init'
import list from './list'
import create from './create'

program
  .version('0.0.1')
  .description('Mini and really simple template engine.')

program
  .command('init')
  .description('Create basic file conf for minitee in the current directory')
  .option('-s, --src <path>', 'Folder of your templates.')
  .option('-d, --dest <path>', 'Default folder for the created files.')
  .action(init)

program
  .command('list')
  .description('List all the templates available.')
  .option('-a, --all', 'Show variables in the template.')
  .action(list)

program
  .arguments('<cmd> [args...]')
  .description('Create file(s) from a template.')
  .action(create)

program.parse(process.argv)
