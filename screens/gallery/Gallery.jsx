import {View, StyleSheet, Dimensions, Text, ScrollView} from 'react-native';
import BackButton from '../../components/backButton/BackButton';
import GalleryBox from '../../components/galleryBox/GalleryBox';
import sampleHairStyle from '../../data/sampleHairStyle';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const Gallery  = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButton}>
                    <BackButton />
                </View>
                <View style={styles.screenTitleContainer}>
                    <Text style={styles.screenTitle}>Gallery</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.galleryContent}>
                    {sampleHairStyle.map(style => {
                        return <GalleryBox image={style.image} name={style.name}/>
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:  {
        width: viewportWidth,
        height: viewportHeight,
        backgroundColor: '#3d5c98',
        paddingTop:10
    },
    backButton: {
		position: 'absolute',
		width: '20%',
		flexDirection: 'row',
		alignContent: 'space-around',
		alignItems: 'center',
		marginTop: viewportHeight/13,
		paddingLeft: viewportWidth/20,
		zIndex: 999,
	},
    screenTitle: {
		width: '100%',
		fontSize: 28,
		fontWeight: "700",
		color: '#fff',
		letterSpacing: 1,
		textAlign: 'center',
		marginTop: viewportHeight/14,
	},
    header: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        padding: 13
    },
    galleryContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: viewportWidth/40,
        paddingTop: viewportHeight/50,
        paddingHorizontal: viewportWidth/40,
    }
})

export default Gallery;
