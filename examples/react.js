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
