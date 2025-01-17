import { StyleSheet, Text, View } from 'react-native';

import * as ExpoScreenshotDetector from 'expo-screenshot-detector';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoScreenshotDetector.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
