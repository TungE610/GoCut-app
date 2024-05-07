import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ImagePreview from 'react-native-image-preview';

const PrevHair = () =>  {
    const [visible, setIsVisible] = useState(true);

    return (
        <View>
            <ImagePreview
                images={{uri: "./../assets/hair-style-0.png"}}
                imageIndex={0} 
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    )
}

export default PrevHair;
