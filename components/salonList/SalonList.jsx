import {View, StyleSheet, Dimensions, Animated,  TouchableOpacity, Text, ScrollView, Easing, FlatList} from 'react-native';
import Location from '../../assets/location.svg';
import {useRef, useEffect} from 'react';
import FastImage from 'react-native-fast-image'
import StarIcon from '../../assets/star.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function trimAddress(address) {
    if (address.length > 36) {
        return address.substring(0, 35) + "...";
    } else {
        return address;
    }
}

function metersToKilometers(meters) {
    var kilometers = meters / 1000;
    return kilometers.toFixed(1);
}

const SalonCard = (props) => {
    const fadeInOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeInOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeInOpacity }}>
            <TouchableOpacity
                style={styles.salonCardContainer}
                onPress={props.onClick}
				delayPressIn={100}
            >
                <FastImage
                    source={{ uri: props.salonImage }}
                    resizeMode="cover"
                    style={[
                        styles.salonImage,
                    ]}
                />
				<View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                	<Text style={styles.name}>{props.name}</Text>
					{/* <StarRatingDisplay
						rating={props.rating}
						starSize={22}
					/> */}
					<View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
						<StarIcon color="#f57842"/>
						<Text style={{color: "#f57842", fontWeight: "500"}}>{props.rating}</Text>
					</View>
				</View>
                <View style={styles.addressContainer}>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <Location width={14} height={14} />
                        <Text style={styles.location}>{trimAddress(props.address)}</Text>
                    </View>
					<View style={{flexDirection: 'row', alignItems: 'center', gap:4}}>
						<TouchableOpacity onPress={() => { props.seeMap(props.destination) }}>
							<Text style={styles.guide}>Guide</Text>
						</TouchableOpacity>
						<Text style={styles.distance}>{metersToKilometers(props.distance)} km</Text>
					</View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const SalonList = (props) => {

	const selectSalonHandler = (value) => {

		props.selectSalon(value);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={props.salonList}
 				contentContainerStyle={{ paddingBottom: 20 }}
				contentInset={{top: 0, bottom: 100, left: 0, right: 0}}
				contentInsetAdjustmentBehavior="automatic"
				renderItem={({item}) => item && <SalonCard 
					salonImage={item.images && item.images.length > 0? item.images[0].image_url : ""}
					name={item.name}
					address={item.address || ""}
					rating={item.rating}
					onClick={() => {
						selectSalonHandler({id: item.id, name: item.name});
					}}
						destination={item.address}
						seeMap={props.seeMap} 
						distance={item.distance}
					/>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth,
		paddingHorizontal: 5,
		marginTop: 3,
		flex: 1,
	},
	salonCardContainer: {
		width: viewportWidth - 10,
		paddingVertical: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		gap: 7,
		justifyContent: 'space-between',
		backgroundColor: "#fff",
		marginTop: 5,
		paddingHorizontal: 5,
		borderRadius: 5
	},
	salonImage: {
		width: '100%',
		height: viewportHeight/7,
		borderRadius: 5
	},
	name: {
		fontWeight: "600",
		fontSize: 18,
		paddingLeft: 5,
		color: '#222',
	},
	addressContainer: {
		flexDirection: 'row',
		paddingHorizontal: 5,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	location: {
		color: '#111',
		fontWeight: "400",
	},
	distance: {
		color: '#f57842',
		fontWeight: 'bold'
	},
	guide: {
		textDecorationLine: 'underline',
		color: '#0a7dc4',
		fontWeight: '500',
	}
})

export default SalonList;
