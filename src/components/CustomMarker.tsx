import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../styled/theme';
import CONSTANTS from '../utils/CONSTANTS';
import CustomMarkerContainer from './CustomMarkerContainer';

type CustomMarkerProps = {
  type: string;
  size?: string;
  selected?: boolean;
};

const CustomMarker = ({type, size, selected}: CustomMarkerProps) => {
  const {heart, shopping, culture, food, amusement} = theme.color.markerBg;
  const iconSize =
    size === 'large' ? CONSTANTS.ICON_LARGE : CONSTANTS.ICON_SMALL;
  let bgColor = heart;
  let Icon;
  switch (type) {
    case CONSTANTS.SHOPPING:
      bgColor = shopping;
      Icon = <FontAwesome size={iconSize} color={'#fff'} name="shopping-bag" />;
      break;
    case CONSTANTS.FOOD:
      bgColor = food;
      Icon = <Ionicons size={iconSize} color={'#fff'} name="fast-food" />;
      break;
    case CONSTANTS.AMUSEMENT:
      bgColor = amusement;
      Icon = (
        <MaterialCommunityIcons
          size={iconSize}
          color={'#fff'}
          name="party-popper"
        />
      );
      break;
    case CONSTANTS.CULTURE:
      bgColor = culture;
      Icon = <MaterialIcons size={iconSize} color={'#fff'} name="museum" />;
      break;
    default:
      Icon = <AntDesign size={iconSize} color={'#fff'} name="heart" />;
  }

  if (selected !== undefined) {
    bgColor = selected ? bgColor : theme.color.secondary;
  }

  return (
    <CustomMarkerContainer size={size} color={bgColor}>
      {Icon}
    </CustomMarkerContainer>
  );
};

export default CustomMarker;
