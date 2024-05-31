import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import BackButton from '../../components/backButton/BackButton';

Geocoder.init("AIzaSyCXMER8nT28GR0VF--NbVdWROad-vDeZo4", {language : "vi"}); // use a valid API key
const GOOGLE_MAPS_APIKEY = "AIzaSyCXMER8nT28GR0VF--NbVdWROad-vDeZo4";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const Map = ({route, navigation}) => {
    const [location, setLocation] = useState(null);
    const [des, setDes] = useState(null);
    const [loading, setLoading] = useState(true);

    const { destination } = route.params;

    const backButtonClickedHandler = () => {
		navigation.navigate('Booking', {
            initStep: null,
            selectedSalonId: null,
            selectedServicesId: [],
            selectedTotalTime: 0,
        });
	}
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const currentLocation = await GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 60000,
                });

                setLocation(currentLocation);

                await Geocoder.from(destination)
                    .then(json => {
                        var lo = json.results[0].geometry.location;
                        setDes(lo);
                })

            } catch (error) {
                console.warn(error.code, error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []); // Empty dependency array to run effect only once on component mount

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <BackButton onClick={backButtonClickedHandler}/>
			</View>
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : location ? (
                <MapView
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                >
                    <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude}} />
                    <Marker coordinate={{ latitude: des.lat, longitude: des.lng}} />
                    <MapViewDirections
                        origin={{latitude: location.latitude, longitude: location.longitude}}
                        destination={{latitude: des.lat, longitude: des.lng}}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="hotpink"
                    />
                </MapView>
            ) : (
                <View style={styles.errorContainer}>
                    <Text>Error: Location not available</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
		position: 'absolute',
		width: '20%',
		flexDirection: 'row',
		alignContent: 'space-around',
		alignItems: 'center',
		marginTop: viewportHeight/15,
		paddingLeft: viewportWidth/20,
		zIndex: 999,
	},
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Map;
