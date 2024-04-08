import { useState, useEffect, useRef } from 'react';
import {Camera, useCameraDevice, useCameraFormat} from 'react-native-vision-camera';
import {StyleSheet, View, TouchableOpacity, Dimensions, Image, Text} from 'react-native'; 
import ShutterBtn from '../assets/shutter.svg';
import FlipCameraBtn from '../assets/flipCamera.svg';
import CloseBtn from '../assets/close.svg';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = () => {
    const [camView, setCamView] = useState('back'); 
    const [showCamera, setShowCamera] = useState(true);   
    const camera = useRef(null);
    const device = useCameraDevice(camView, {
        physicalDevices: ['wide-angle-camera']
     });
      
     const [imageSource, setImageSource] = useState(null);
     const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

     useEffect(() => {
         async function getPermisstion() {
             const permission = await Camera.requestCameraPermission();
             if (permission === 'denied') await Linking.openSettings();
         }
         getPermisstion();
     }, [])
    const flipCamera = () => {
        if (camView === 'back') {
            setCamView('front');
        } else {
            setCamView('back');
        }
    }   
     const capturePhoto = async () => {
         if (camera.current !== null){
            try {
                const photo = await camera.current.takePhoto()
                setShowCamera(false);
                setImageSource(photo);

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

    const startTransfrom = async () => {
        const formData = new FormData();
        formData.append("file_upload", {uri: imageSource.path, name: 'EDF7A611-B475-446C-86EE-34E9907BFF48.jpeg', type: 'image/jpeg'});
        try {
            const endPoint = 'https://7c60-70-24-203-73.ngrok-free.app/uploadfile';
            let response = await fetch(endPoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },            
            }).then(response => response.json())
            .then(response => {
                console.log('response', response)
            })
            
            hairTransfer();

            if (response.ok) {
                console.log("File uploaded successfully")
            } else {
                console.log(response)
            }

        } catch (error) {
            return error
        }

    }

    const hairTransfer = async () => {
        console.log("transfer")

        try {
            const endPoint = 'https://7c60-70-24-203-73.ngrok-free.app/hair-transfer';
            let response = await fetch(endPoint).then(response => response.json())
            .then(response => {
              console.log('response', response)
            })

            if (response.ok) {
                console.log("File uploaded successfully")
            } else {
                console.log(response)
            }

        } catch (error) {
            return error
        }
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
            width: 30,
            height: 30,
        },
        afterCapture: {
            position: 'absolute',
            top: viewportHeight - 130,
            left: 20,
            flexDirection: 'row',
            gap: 30
        },
        transformBtn: {
            width: 100,
            height: 45,
            backgroundColor: '#3d5c98',
            borderRadius: 5,
            alignItems: 'center'
        },
        transformText: {
            color: '#fff',
            height: 45
        },
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
                        uri: `file://${imageSource !== null ? imageSource.path : ' '}`,
                    }}
                />
                <View style={styles.afterCapture}>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={recapture}
                    >
                        <CloseBtn />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.transformBtn} onPress={startTransfrom}>
                        <Text style={styles.transformText}>Transform</Text>
                    </TouchableOpacity>
                </View>
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
                onPress={flipCamera}
            >
                <FlipCameraBtn style={styles.flipCameraBtn} />
            </TouchableOpacity>
        </View>
    </>
    )
}

export default CameraScreen;
