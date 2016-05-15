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
///templates/react.js
---
filename: ${name}Class.js
dest: components
---
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

```json
//./minitee
{
  "src": "./examples", //default "./templates"
  "dest": "build" //default "."
}
```

Then, in the "examples" folder create your templates.


## Soon

- Create multiple files with one command ("class", "test", ...)
- Allow default value to attributes
- test
