import {Box} from 'native-base';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  const darkMode = useSelector((state: RootState) => state.config.darkMode);

  return (
    <Box padding={4} flex={1} bg={darkMode ? '#2e3d4b' : '#e9e9e9'}>
      {props.children}
    </Box>
  );
};

export default Page;
