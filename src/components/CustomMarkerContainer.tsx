import {View, StyleSheet} from 'react-native';

type Props = {
  size: string;
  color: string;
  children: JSX.Element;
};

const CustomMarkerContainer = ({size, color, children}: Props) => {
  const iconSize = size === 'large' ? 40 : 20;
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: color,
        height: iconSize,
        width: iconSize,
      }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default CustomMarkerContainer;
