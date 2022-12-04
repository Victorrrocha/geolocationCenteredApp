import {Flex} from 'native-base';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const Card = ({children}: any) => {
  const darkMode = useSelector((state: RootState) => state.config.darkMode);

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      mb="10px"
      bgColor={darkMode ? '#415362' : '#fff'}
      padding="10px"
      borderWidth="1px"
      borderRadius="10px"
      borderColor="transparent"
      shadow="2">
      {children}
    </Flex>
  );
};

export default Card;
