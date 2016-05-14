#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _frontMatter = require('front-matter');

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _chalk = require('chalk');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var infos = function infos(str) {
  var _console;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return (_console = console).log.apply(_console, [(0, _chalk.blue)(str)].concat(args));
};
var neutral = function neutral(str) {
  var _console2;

  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return (_console2 = console).log.apply(_console2, [(0, _chalk.cyan)(str)].concat(args));
};
var warning = function warning(str) {
  var _console3;

  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return (_console3 = console).log.apply(_console3, [(0, _chalk.yellow)(str)].concat(args));
};
var error = function error(str) {
  var _console4;

  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return (_console4 = console).log.apply(_console4, [(0, _chalk.red)(str)].concat(args));
};
var success = function success(str) {
  var _console5;

  for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return (_console5 = console).log.apply(_console5, [(0, _chalk.green)(str)].concat(args));
};

var configFile = (0, _path.resolve)(process.cwd(), '.minitee');
var defaults = { src: './templates', dest: '.' };
var config = _fs2.default.existsSync(configFile) ? Object.assign({}, defaults, JSON.parse(_fs2.default.readFileSync(configFile, 'utf-8'))) : defaults;

var defaultInfos = { dest: '.' };
var srcDir = (0, _path.resolve)(process.cwd(), config.src);
var destDir = (0, _path.resolve)(process.cwd(), config.dest);

var extractAttr = function extractAttr(_ref) {
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
};

var createParams = function createParams(file) {
  var reg = /\.(?=[^.]*$)/;
  var filename = file.split(reg)[0];
  var f = (0, _path.resolve)(srcDir, file);
  var content = _fs2.default.readFileSync(f, 'utf-8');
  var data = (0, _frontMatter2.default)(content);
  data.attributes = Object.assign({}, defaultInfos, { filename: file }, data.attributes);
  var destination = (0, _path.resolve)(destDir, data.attributes.dest);
  var attr = extractAttr(data);
  return _extends({
    name: filename,
    src: f,
    destination: destination,
    attr: attr,
    isDir: _fs2.default.statSync(f).isDirectory()
  }, data);
};
var parseData = function parseData(vv, attr, f, d) {
  var filename = f;
  var data = d;
  attr.map(function (y) {
    if (vv[y] === undefined) warning("La variable '%s' n'as pas était fourni", y);
    var rr = new RegExp('\\$\\{' + y + '\\}', 'g');
    filename = filename.replace(rr, vv[y]);
    data = data.replace(rr, vv[y]);
  });
  return { filename: filename, data: data };
};

var templateFiles = _fs2.default.readdirSync(srcDir);
var templates = templateFiles.map(createParams);

_commander2.default.command('list').action(function () {
  infos("List des templates:");
  templates.map(function (x) {
    infos("  %s", x.name);
    x.attr.map(function (y) {
      return neutral("    - %s", y);
    });
  });
});
_commander2.default.arguments('<cmd> [args...]').action(function (cmd, args) {
  var status = templates.reduce(function (x, y) {
    return y.name === cmd || x;
  }, false);
  var targets = templates.filter(function (x) {
    return x.name.toUpperCase() === cmd.toUpperCase();
  });
  var vv = args.reduce(function (x, y) {
    var _y$split = y.split(':');

    var _y$split2 = _slicedToArray(_y$split, 2);

    var a = _y$split2[0];
    var b = _y$split2[1];

    x[a] = b;
    return x;
  }, {});
  if (status) {
    success("%s templates found", targets.length);
    targets.map(function (x) {
      var _parseData = parseData(vv, x.attr, x.destination + '/' + x.attributes.filename, x.body);

      var filename = _parseData.filename;
      var data = _parseData.data;

      (0, _mkdirp2.default)(x.destination, function (err) {
        _fs2.default.writeFile(filename, data, function (err) {
          console.log((0, _chalk.green)('file created at ') + (0, _chalk.cyan)('%s'), filename);
        });
      });
    });
  } else {
    error("Error, the template doesn't exist.");
    return;
  }
});

_commander2.default.parse(process.argv);