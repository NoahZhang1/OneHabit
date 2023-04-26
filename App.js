import * as React from 'react';
import { Alert, Button, TextInput, View, StyleSheet, SafeAreaView } from 'react-native';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';


Amplify.configure(config);

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#BACDEF',
  }
});

export default App;