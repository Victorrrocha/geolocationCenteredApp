import SelectDropdown from 'react-native-select-dropdown';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export type DropdownProps = {
  onSelect: (selected: string) => void;
};

const FoldersDropdown = ({onSelect}: DropdownProps) => {
  const currentFolder = useSelector(
    (state: RootState) => state.geolocation.currentFolder,
  );
  const folders = useSelector((state: RootState) => state.geolocation.folders);

  return (
    <SelectDropdown
      data={folders}
      defaultValue={currentFolder}
      dropdownIconPosition="right"
      onSelect={selected => onSelect(selected)}
      buttonTextAfterSelection={selected => selected}
      rowTextForSelection={item => item}
      buttonStyle={styles.dropdownStyle}
      renderDropdownIcon={isOpened => {
        return (
          <FontAwesome
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            color={'#444'}
            size={18}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdownStyle: {
    backgroundColor: '#fff',
    width: '100%',
    height: 45,
  },
});

export default FoldersDropdown;
