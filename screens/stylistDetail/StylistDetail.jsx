import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import StarIcon from '../../assets/star.svg';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import TurnBackButton from '../../components/turnBackButton/TurnBackButton';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

const StylistDetail = ({ route, navigation }) => {
    const { stylist } = route.params;

    const turnBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
				<TurnBackButton onClick={turnBack}/>
            </View>
            <View style={styles.content}>
                <FastImage
                    style={styles.avatar}
                    source={{ uri: stylist.item.image_url }}
                />
                <View>
                    <View style={styles.name}>
                        <Text style={{ fontWeight: '500' }}>Name: </Text>
                        <Text style={{ fontWeight: '500' }}>
                            {stylist.item.first_name} {stylist.item.name}
                        </Text>
                    </View>
                    <View style={styles.name}>
                        <Text style={{ fontWeight: '500' }}>Salon: </Text>
                        <Text style={{ fontWeight: '500' }}>{stylist.item.salon_name}</Text>
                        <StarIcon color="#f57842" />
                        <Text style={{ color: "#f57842" }}>{stylist.item.rating}</Text>
                    </View>
                    <View style={styles.album}>
                        <Text style={{ fontWeight: '500' }}>Sample album: </Text>
                    </View>
                    <View style={styles.imageAlbum}>
                        {/* Render stylist images */}
                        {stylist.item.stylist_images && stylist.item.stylist_images.length > 0 && (
                                <ScrollView>
                                    <View style={styles.imageContainer}>
                                            {stylist.item.stylist_images.map((image, index) => (
                                                <View key={index} style={styles.imageWrapper}>
                                                    <FastImage
                                                        style={styles.image}
                                                        source={{ uri: image }}
                                                        resizeMode={FastImage.resizeMode.cover}
                                                    />
                                                </View>
                                            ))}
                                    </View>
                                </ScrollView>
                        )}
                        {/* Show message if no images */}
                        {!stylist.item.stylist_images && <Text>No images</Text>}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: viewportHeight,
        width: viewportWidth,
        backgroundColor: "#3d5c98",
        paddingTop: viewportHeight / 6,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
    },
    content: {
        backgroundColor: '#fff',
        height: viewportHeight * 5 / 6,
        borderRadius: 5,
        position: 'relative',
    },
    avatar: {
        width: viewportWidth / 3,
        height: viewportWidth / 3,
        borderRadius: 5,
        position: 'absolute',
        top: -viewportWidth / 9,
        left: viewportWidth / 20,
    },
    name: {
        paddingTop: 20,
        marginLeft: viewportWidth / 2.3,
        fontSize: 20,
        fontWeight: '600',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    album: {
        marginTop: 60,
        paddingLeft: 20,
    },
    imageAlbum: {
        paddingTop: 10,
        alignItems: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    imageWrapper: {
        margin: 5,
    },
    image: {
        width: viewportWidth / 2.4,
        height: viewportWidth / 2.4,
        borderRadius: 5,
    },
});

export default StylistDetail;
