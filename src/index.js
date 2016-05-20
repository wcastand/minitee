#!/usr/bin/env node

import program from 'commander'
import list from './list'
import cli from './cli'

program
  .command('list')
  .option('-a, --all', 'Show variables')
  .action(list)
program
  .arguments('<cmd> [args...]')
  .action(cli)

program.parse(process.argv)
