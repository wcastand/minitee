---
filename: ${compo}Class.js
---
import React, { Component, PropTypes } from 'react'
import {
  StyleSheet
  , View
  , Text
  } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class ${name} extends Component {
  static propTypes = {
    routes: PropTypes.object,
  }
  render(){
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

export default connect(({routes}) => ({routes}))(${name})
