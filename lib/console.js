'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.error = exports.warning = exports.neutral = exports.infos = undefined;

var _chalk = require('chalk');

var infos = exports.infos = function infos(str) {
  var _console;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return (_console = console).log.apply(_console, [(0, _chalk.blue)(str)].concat(args));
};
var neutral = exports.neutral = function neutral(str) {
  var _console2;

  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return (_console2 = console).log.apply(_console2, [(0, _chalk.cyan)(str)].concat(args));
};
var warning = exports.warning = function warning(str) {
  var _console3;

  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return (_console3 = console).log.apply(_console3, [(0, _chalk.yellow)(str)].concat(args));
};
var error = exports.error = function error(str) {
  var _console4;

  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return (_console4 = console).log.apply(_console4, [(0, _chalk.red)(str)].concat(args));
};
var success = exports.success = function success(str) {
  var _console5;

  for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return (_console5 = console).log.apply(_console5, [(0, _chalk.green)(str)].concat(args));
};