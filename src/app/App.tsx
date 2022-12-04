import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';
import MyTabs from '../navigation/MyTabs';
import theme from '../styled/theme';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from '../redux/store';

const App = function () {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <MyTabs />
          </NavigationContainer>
        </ThemeProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
