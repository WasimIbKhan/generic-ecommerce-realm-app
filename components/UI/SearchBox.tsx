// SearchBox.tsx
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-native';
import { Searchbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface SearchBoxProps {
  currentRefinement: string;
  refine: (value: string) => void;
  focus: () => void;
  focusState: boolean;
  search: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ currentRefinement, refine, focus, focusState, search }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.input}
        icon={() => !focusState ? <AntDesign name="search1" size={24} color="black" /> : <AntDesign name="arrowleft" size={24} color="black" />}
        onIconPress={focus}
        onSubmitEditing={search}
        onChangeText={value => refine(value)}
        value={currentRefinement}
        placeholder="Search"
      />
    </View>
  );
};

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.01,
    marginBottom: Dimensions.get('window').height * 0.02,
    marginHorizontal: Dimensions.get('window').width * 0.025
  },
  input: {
    height: Dimensions.get('window').width * 0.15,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
});

export default connectSearchBox(SearchBox);
