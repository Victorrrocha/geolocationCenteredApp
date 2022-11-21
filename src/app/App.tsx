import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';
import {GeolocationProvider} from '../context/GeolocationContext';
import MyTabs from '../navigation/MyTabs';
import theme from '../styled/theme';

const App = function () {
  return (
    <GeolocationProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </ThemeProvider>
    </GeolocationProvider>
  );
};

export default App;
