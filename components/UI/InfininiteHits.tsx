// InfiniteHits.tsx
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';

interface InfiniteHitsProps {
  hits: Array<object>;
  hasMore: boolean;
  refine: () => void;
  listItem: (item: object, navigation: any) => JSX.Element;
  navigation: any;
}

const InfiniteHits: React.FC<InfiniteHitsProps> = ({ hits, hasMore, refine, listItem, navigation }) => {
  return (
    <FlatList
      data={hits}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.objectID}
      onEndReached={() => hasMore && refine()}
      renderItem={({ item }) => (
        listItem(item, navigation)
      )}
    />
  );
};

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  listItem: PropTypes.func.isRequired
};

export default connectInfiniteHits(InfiniteHits);
