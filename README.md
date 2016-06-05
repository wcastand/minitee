# Minitee

Mini template engine.

[![Travis](https://img.shields.io/travis/wcastand/minitee.svg?style=flat-square)](https://travis-ci.org/wcastand/minitee)
[![downloads](https://img.shields.io/npm/dm/minitee.svg?style=flat-square)](https://www.npmjs.com/package/minitee)
[![version](https://img.shields.io/npm/v/minitee.svg?style=flat-square)](https://www.npmjs.com/package/minitee)
[![license](https://img.shields.io/npm/l/minitee.svg?style=flat-square)](https://opensource.org/licenses/MIT)
## Installation

```
npm i -g minitee
````

## Basic usage

First, create a folder named templates.

Create a file, for example react.js
```javascript
///--components/${name}Class.js

import React from 'react'
const {Component} = React
import redux from 'redux'

export default class ${name} extends Component {
  render(){
    return (<div>${content}</div>)
  }
}
```

Then in your terminal:
```
minitee react name:List content:"<span>Hello World</span>"
```

And voila, you just created your first minitee file.

## Advanced usage

Create a configuration file ".minitee" at the root of your project.
You can use ``` minitee init -s ./examples -d build ```
or create a file manually, this is the equivalent of the previous command:

```json
//./minitee
{
  "src": "./examples", //default "./templates"
  "dest": "build" //default "."
}
```

Then, in the "examples" folder create your templates.

### Multiple files in one command

You can create multiple files with one command by using different ways.
The first one is by creating multiple template with the same name and different extensions.

```
  native.js
  native.css
  ...
```

Or you can create one file and use the special synthax(``` //-- path/filename ```) to define multiple files in it.

```
///--test/${name}.js

console.log("first file")

///--${test}Class.js

console.log("second file")

///-- components/${name}/index.js

console.log("third file ${name}")
```
