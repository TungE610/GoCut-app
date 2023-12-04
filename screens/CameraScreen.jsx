import { useState, useEffect, useRef } from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {StyleSheet, View, TouchableOpacity, Dimensions, Image} from 'react-native'; 
import ShutterBtn from '../assets/shutter.svg';
import FlipCameraBtn from '../assets/flipCamera.svg';
import CloseBtn from '../assets/close.svg';

const CameraScreen = () => {
    const [camView, setCamView] = useState('back'); 
    const [showCamera, setShowCamera] = useState(true);   
    const camera = useRef(null);
    const device = useCameraDevice(camView, {
        physicalDevices: ['wide-angle-camera']
     });
     const [imageSource, setImageSource] = useState('');
     const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

     useEffect(() => {
         async function getPermisstion() {
             const permission = await Camera.requestCameraPermission();
             if (permission === 'denied') await Linking.openSettings();
         }
         getPermisstion();
     }, [])
 
     const capturePhoto = async () => {
         if (camera.current !== null){
            try {
                const photo = await camera.current.takePhoto()
                setShowCamera(false);
                setImageSource(photo.path);
            } catch(error) {
                return error;
            }
         }
     }

    if (device == null) {
		return "";
	}
    
    const recapture = () => {
        setShowCamera(true);
    }

    const styles = StyleSheet.create({
        cameraControl: {
            position: 'relative',
            flexDirection: 'row',
            top: viewportHeight - 130,
            width: viewportWidth,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20
        },
        shutter: {
        },
        image: {
            height: viewportHeight,
            width: viewportWidth,
        },
        shutterBtn: {
            width: 120,
            height: 120,
        },
        closeBtn: {
            position: 'absolute',
            top: viewportHeight - 130,
            left: 20,
            width: 30,
            height: 30,
        }
    })

    return (
    <>
        {showCamera ? (
            <Camera
            ref={camera}
            device={device}
            style={StyleSheet.absoluteFill}
            isActive={showCamera}
            photo={true}
            />
        ) : (
            imageSource !== '' && (
            <>
                <Image
                    style={styles.image}
                    source={{
                        uri: `file://${imageSource}`,
                    }}
                />
                <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={recapture}
                >
                    <CloseBtn />
                </TouchableOpacity>
            </>
            )
        )}
        <View style={styles.cameraControl}>
            <TouchableOpacity
                style={styles.cameraFlashBtn}
                onPress={() => {

                }}
            >          
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => capturePhoto()}
            >
                <View style={styles.shutter}>
				    <ShutterBtn style={styles.shutterBtn} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cameraFlipBtn}
            >
                <FlipCameraBtn style={styles.flipCameraBtn} />
            </TouchableOpacity>
        </View>
    </>
    )
}

export default CameraScreen;
