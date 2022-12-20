import {AspectRatio, Box, Heading, Image, Row, Stack, Text} from 'native-base';
import Button from './styled/Button.styled';

export type TripProps = {
  id: string;
  title: string;
  destination?: string;
  departure?: Date | string;
  arrival?: Date | string;
  expenses?: number | null;
  navigation?: any;
};

const img =
  'https://contents.mediadecathlon.com/s860057/k$2b04047f45dd91d00d3bcfffa7589049/800x0/2304pt1945/3456xcr3456/default.jpg?format=auto&quality=80';
const TripCard = ({title, destination, navigation}: TripProps) => {
  const onSeeMarkers = () => {
    navigation.navigate('MyMarkers', {folder: title});
  };

  return (
    <Box
      bgColor="#fff"
      rounded="lg"
      overflow="hidden"
      borderColor="#f3f3f3"
      borderWidth="1"
      mb="20px">
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: img,
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Stack p="4" space={2}>
        <Heading size="md" ml="-1">
          {title}
        </Heading>
        <Row alignItems="flex-end">
          <Text color="coolGray.300">{destination || 'Destination'}</Text>
        </Row>
        <Button title="See markers" onPress={onSeeMarkers} />
      </Stack>
    </Box>
  );
};

export default TripCard;
