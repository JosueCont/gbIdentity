import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, LogBox } from 'react-native';
import { NativeBaseProvider, Text } from 'native-base';
import Constants from "expo-constants";
import { theme } from './src/utils/theme';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import NavigationContainerConfig from './src/stacks/NavigationContainer';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainerConfig />
      </NativeBaseProvider>
    </Provider>
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
