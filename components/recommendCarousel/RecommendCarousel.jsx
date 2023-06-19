import { Dimensions, Animated, FlatList, StyleSheet, View} from 'react-native';
import React, { useRef } from 'react';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const RecommendCarousel = ({data, item: Item}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 100,
  }).current;

  return (
    <View style={styles.container}>
      	<FlatList
			data={data}
			renderItem={(item,id) => <Item key={id} item={item} />}
			horizontal
			pagingEnabled
			snapToAlignment="center"
			showsHorizontalScrollIndicator={false}
			onScroll={handleOnScroll}
			viewabilityConfig={viewabilityConfig}
			styles={styles.carousel}
      	/>
    </View>
  );
};

export default RecommendCarousel;

const styles = StyleSheet.create({
	container: {
		margin: 0,
		padding: 5,
		height: viewportHeight/4,
		width: '100%',
		borderRadius: 10,
		borderWidth: '1px',
		borderColor: '#ccc',
		backgroundColor: '#fff',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 12,
	},
	carousel: {
		borderRadius: 10,
		width: '90%'
	}
});
