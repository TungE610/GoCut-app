import {useCameraDevice} from 'react-native-vision-camera';

const Camera = () => {
    const device = useCameraDevice('back')
    
    if (device == null) return null;
    return (
    <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
    />
    )
}

export default Camera;
