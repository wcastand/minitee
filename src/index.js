#!/usr/bin/env node

import program from 'commander'
import {cli, list} from './cli'

program
  .command('list')
  .action(list)
program
  .arguments('<cmd> [args...]')
  .action(cli)

program.parse(process.argv)
