import {View, StyleSheet, Dimensions, Image} from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const GalleryBox = (props) => {
    
    return (
        <View style={styles.container}>
            <Image style={styles.styleImage} source={props.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 0.46 * viewportWidth,
        height: 0.46 * viewportWidth,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 3,
    },
    styleImage: {
        width: 0.46 * viewportWidth-6,
        height: 0.46 * viewportWidth-6,
        borderRadius: 5,
    }
})

export default GalleryBox;
