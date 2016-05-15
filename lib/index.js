#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _cli = require('./cli');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.command('list').action(_cli.list);
_commander2.default.arguments('<cmd> [args...]').action(_cli.cli);

_commander2.default.parse(process.argv);