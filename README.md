# Minitee

Mini template engine.

## Installation (soon)

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
  "folder": "./examples", //default "./templates"
  "dest": "build" //default "."
}
```

Then, in the "examples" folder create your templates.


## Soon

- Create multiple files with one command ("class", "test", ...)
- Allow default value to attributes
