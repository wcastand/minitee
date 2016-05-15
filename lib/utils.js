'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseData = exports.templates = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _frontMatter = require('front-matter');

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _ramda = require('ramda');

var _console = require('./console');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractAttr = (0, _ramda.curry)(function (_ref) {
  var attributes = _ref.attributes;
  var body = _ref.body;

  var reg = /\$\{(.*)\}/g;
  var ff = attributes.filename.match(reg) || [];
  var dd = attributes.dest.match(reg) || [];

  var matches = body.match(reg);
  matches = matches !== null ? matches.concat(ff, dd) : [].concat(ff, dd);

  if (matches !== null) return Array.from(new Set(matches.map(function (x) {
    return (/\$\{(.*)\}/.exec(x)[1]
    );
  })));else return [];
});

var createParams = (0, _ramda.curry)(function (config, file) {
  var reg = /\.(?=[^.]*$)/;
  var filename = file.split(reg)[0];
  var f = (0, _path.resolve)(config.src, file);
  var content = _fs2.default.readFileSync(f, 'utf-8');
  var data = (0, _frontMatter2.default)(content);
  data.attributes = _extends({
    dest: config.dest,
    filename: file
  }, data.attributes);

  return _extends({
    name: filename,
    src: f,
    destination: data.attributes.dest !== undefined ? (0, _path.resolve)(config.dest, data.attributes.dest) : config.dest,
    attr: extractAttr(data),
    isDir: _fs2.default.statSync(f).isDirectory()
  }, data);
});
var templateFiles = _fs2.default.readdirSync(_config2.default.src);
var basicParams = createParams(_config2.default);

var templates = exports.templates = templateFiles.map(basicParams);
var parseData = exports.parseData = (0, _ramda.curry)(function (vv, attr, f, d) {
  var filename = f;
  var data = d;
  attr.map(function (y) {
    if (vv[y] === undefined) return (0, _console.warning)("La variable '%s' n'as pas était fourni", y);
    var rr = new RegExp('\\$\\{' + y + '\\}', 'g');
    filename = filename.replace(rr, vv[y]);
    data = data.replace(rr, vv[y]);
  });
  return { filename: filename, data: data };
});