'use strict';

/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  ScrollView,
} from 'react-native';

// import ListViewItem from 'ListViewItem';

var listItems = [
  {title  : 'Item 1'},
  {title  : 'Item 2'},
  {title  : 'Item 3'},
  {title  : 'Item 4'},
  {title  : 'Item 5'},
];

export default class LitViewTemplate extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      items: ds.cloneWithRows(listItems),
    };
  }

  render() {
    return (
      <ScrollView>
        <ListView
          style={styles.container}
          dataSource={this.state.items}
          renderRow={(data) => <Text>listItems.title</Text>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: 'lightgray',
  },
});
