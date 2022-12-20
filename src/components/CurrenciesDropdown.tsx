import SelectDropdown from 'react-native-select-dropdown';
import {StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export type DropdownProps = {
  onSelect: (selected: string) => void;
};

const CurrenciesDropdown = ({onSelect}: DropdownProps) => {
  const currencies = ['USD', 'BRL', 'EUR', 'GBP'];

  return (
    <SelectDropdown
      data={currencies}
      defaultValue={currencies[0]}
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
    flex: 1,
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 2,
  },
});

export default CurrenciesDropdown;
