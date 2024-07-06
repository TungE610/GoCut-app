import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import AddIcon from '../../assets/add.svg';
import ImagePicker from 'react-native-image-crop-picker';
import FavouriteItem from '../../components/favouriteItem/FavouriteItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageView from "react-native-image-viewing";
import * as Progress from 'react-native-progress';
import { showMessage } from "react-native-flash-message";

const host = "https://salon-docker-production.up.railway.app";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const Favourite = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [isProcessingAnImage, setIsProcessingAnImage] = useState(false);
    const [isInferencing, setIsInferencing] = useState(false);
	const [result, setResult] = useState('');
    const [progress, setProgress] = useState(0);

	const [isPreviewingResult, setIsPreviewingResult] = useState(false);

    const [favourites, setFavourites] = useState([]);

    const backButtonClickHandler = () => {
        navigation.navigate('Dashboard');
    }

    const getFavourites = async () => {
        setLoading(true);
        await axios(`${host}/api/customer/favourites`).then(
            res => {
                setFavourites(res.data)
                setLoading(false);
            }
        )
    }
    useEffect(() => {

		if (isInferencing) {
			const duration = 30000; // 30 seconds in milliseconds
			const interval = 100; // Update interval (milliseconds)
			const steps = duration / interval; // Number of steps to reach 1 from 0

			let currentStep = 0;

			const timer = setInterval(() => {
			currentStep++;
			const newProgress = currentStep / steps; // Calculate the new progress

			setProgress(newProgress);

			if (currentStep === steps) {
                setLoading(true);
				clearInterval(timer); // Stop the timer when progress reaches 1
				setIsInferencing(false);
			}
			}, interval);

			return () => clearInterval(timer); // Cleanup the timer on component unmount
		}
	}, [isInferencing]);

    useEffect(() => {

        getFavourites();
    }, [])

    const addMoreFavouriteHandler = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true
        }).then(async image => {
            const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => console.log(error));

            const formData = new FormData();

		    formData.append("file_upload", {uri: image.path, name: 'favourite.png', type: 'image/jpeg'});
		    formData.append("id", `${userId}_${favourites.length}`);

            const endPoint = 'https://gorilla-poetic-gull.ngrok-free.app/embedImage';
            setLoading(true);

			await fetch(endPoint, {
				method: 'POST',
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},            
			}).then(async (response) => {const text = await response.text(); return text})
			.then(async (image_url) => {

                await axios.post(`${host}/api/customer/add-favourites`, null, {
                    params: {
                        image_url: image_url.replaceAll('"', ''),
                        customer_id: userId,
                    }

                }).then (res => {
                    getFavourites();
                })                
                setLoading(false);
                showMessage({
                    message: "Successfully add new favourite image",
                    type: "success",
                    duration: 10000,
                    icon: "success",
                });
            })
        });
    }
    const changeProcessImageState = (state) => {
		setIsProcessingAnImage(state);

		if (!state) {
			setIsInferencing(true)
		}
	}

    const getResult = (result) => {
		setResult(result);	
        setLoading(false);
		setIsPreviewingResult(true);
	}
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: viewportWidth }}>
			{loading && 
                <View style={{gap: 5, alignItems: 'center'}}>
					<ActivityIndicator color={"#3d5c98"} />
					<Text style={{color: "#3d5c98"}}>Processing image, it may takes a few seconds ... </Text>
				</View>}
            {isProcessingAnImage && 
				<View style={{gap: 5, alignItems: 'center'}}>
					<ActivityIndicator color={"#3d5c98"} />
					<Text style={{color: "#3d5c98"}}>Processing image, it may takes some seconds ... </Text>
				</View>
			}
            {isInferencing && 
				<View style={{gap: 30, alignItems: 'center'}}>
					<Progress.Circle progress={progress} size={100} color={"#3d5c98"} thickness={7} borderWidth={3} showsText={true}/> 
					<Text style={{color: "#3d5c98"}}>Transfering, please wait ...</Text>
				</View>
			}
            {!loading && !isProcessingAnImage && !isInferencing && <View>
                <ImageView
                    images={[{uri: result}]}
                    imageIndex={0}
                    visible={isPreviewingResult}
                    onRequestClose={() => setIsPreviewingResult(false)}
                />
                <View style={styles.backButton}>
                    <ReturnHomeButton onClick={backButtonClickHandler} page="favourite" />
                </View>
                {/* <View style={styles.screenHeader}> */}
                    <View style={styles.screenTitleContainer}>
                        <Text style={styles.screenTitle}>Favourite</Text>
                    </View>
                {/* </View> */}
                <ScrollView>
                    {
                        favourites.map((favourite, index) => {
                            return (
                                <FavouriteItem 
                                    key={index} 
                                    id={index}
                                    image_url={favourite.image_url} 
                                    name={favourite.name} 
									changeProcessImageState={changeProcessImageState}
                                    getResult={getResult}
                                />
                            )
                        })
                    }
                </ScrollView>
                <TouchableOpacity style={{height: viewportHeight / 10, flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 20}} onPress={addMoreFavouriteHandler}>
                    <AddIcon width={40} height={40}/>
                    <Text style={{fontSize: 20, color: '#3d5c98', fontWeight: "600"}}>Add New</Text>
                </TouchableOpacity>
            </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
		height: viewportHeight,
		width: viewportWidth,
		flexDirection: 'column',
    },
    // screenHeader: {
	// 	width: viewportWidth,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
	// },
	backButton: {
		position: 'absolute',
		width: '20%',
		flexDirection: 'row',
		alignContent: 'space-around',
		alignItems: 'center',
		marginTop: viewportHeight/15,
		paddingLeft: viewportWidth/50,
		zIndex: 999,
        left: -130,
	},
	screenTitleContainer: {
		borderBottomWidth: 0.3,
		borderBottomColor: '#555',
		paddingBottom: 15,
	},
	screenTitle: {
		width: '100%',
		fontSize: 28,
		fontWeight: "700",
		color: '#3D5C98',
		letterSpacing: 1,
		textAlign: 'center',
		marginTop: viewportHeight/14,
	},
})

export default Favourite;

