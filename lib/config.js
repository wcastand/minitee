'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configFile = (0, _path.resolve)(process.cwd(), '.minitee');
var defaults = { src: './templates', dest: '.' };
var fileContent = _fs2.default.existsSync(configFile) ? JSON.parse(_fs2.default.readFileSync(configFile, 'utf-8')) : {};

var createConfig = (0, _ramda.curry)(function (defaultConfig, userConfig) {
  return Object.assign({}, defaultConfig, userConfig);
})(defaults);

var updatePath = (0, _ramda.curry)(function (rootDir, config) {
  return _extends({}, config, { src: (0, _path.resolve)(rootDir, config.src),
    dest: (0, _path.resolve)(rootDir, config.dest)
  });
})(process.cwd());

exports.default = (0, _ramda.compose)(updatePath, createConfig)(fileContent);