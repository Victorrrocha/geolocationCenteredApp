import React from 'react';
import {StyleSheet, View} from 'react-native';

const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

function Layout(props: any) {
  return <View style={style.container}>{props.children}</View>;
}

export default Layout;
