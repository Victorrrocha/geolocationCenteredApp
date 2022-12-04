import {useDispatch, useSelector} from 'react-redux';
import {toggleDarkMode} from '../redux/configSlice';
import {Row, Text} from 'native-base';
import {RootState} from '../redux/store';
import Page from '../components/Page';
import {Switch} from 'react-native';
import {Theme} from '../styled/theme';
import {useTheme} from 'styled-components';

function Config() {
  const theme = useTheme() as Theme;
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.config.darkMode);

  const toggleModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Page>
      <Row justifyContent="space-between">
        <Text color={darkMode ? theme.color.dark : theme.color.light}>
          Dark Mode:
        </Text>
        <Switch value={darkMode} onValueChange={toggleModeHandler} />
      </Row>
    </Page>
  );
}

export default Config;
