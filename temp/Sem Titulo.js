'use strict';

import React, { Component } from 'react';

import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

class Default extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>Texto</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
text: {
  color: 'black',
  textAlignVertical: 'center'
}

});

export default Default;