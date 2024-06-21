import {View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image'
import EditIcon from '../../assets/write.svg';
import SaveIcon from '../../assets/save.svg';
import {useState} from 'react';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = process.env.HOST

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const FavouriteItem = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(props.name);
	const [image, setImage] = useState('');

    const editHandler = async () => {
        setIsEditing(prev => !prev);

        if (isEditing) {                
                await axios.put(`${host}:8000/api/favourite-images/rename`, null, {
                    params: {
                        imageUrl: props.image_url,
                        newName: name,
                    }
                }).then(res => {
                    console.log(res.data.message);
                })
        }
    }
    const transferImage = async (uri) => {

		const formData = new FormData();
        const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => console.log(error));

		formData.append("file_upload", {uri: uri, name: 'new_file.png', type: 'image/jpeg'});
		formData.append("id", `${userId}_${props.id}`);

		try {
			props.changeProcessImageState(true);

			const endPoint = 'https://goose-clean-rattler.ngrok-free.app/uploadfile';

			await fetch(endPoint, {
				method: 'POST',
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},            
			})

			.then(async (response) => {const text = await response.text(); return text})
				.then(async (text) => {
					if (text.replaceAll('"', '') == "Done") {

						props.changeProcessImageState(false);

						const transferEndPoint = 'https://goose-clean-rattler.ngrok-free.app/hair-transfer';

						const transferFormData = new FormData();

						transferFormData.append("id", `${userId}_${props.id}`);

						await fetch(transferEndPoint, {
							method: 'POST',
							body: transferFormData,
							headers: {
								'Content-Type': 'multipart/form-data',
							},            
						}).then(async (response) => {
								const text =  await response.text();
								return text
							})
							.then((text) => {
								props.getResult(text.replaceAll('"', ''));
							});
						}
				})

		} catch (error) {
			return error
		}
	}
    const tryNowHandler = () => {
        const options = {
            saveToPhotos: false,
            mediaType: 'photo',
            includeBase64: true,
        };
        
        ImagePicker.launchCamera(options, async res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.errorCode) {
                console.log('ImagePicker Error: ', res.errorMessage);
            } else {
				setImage(res.assets[0].uri);

        		transferImage(res.assets[0].uri)
            }
        });
    }
    return (
        <View style={styles.container}>
            <FastImage source={{uri : props.image_url}} style={styles.image}/>
            <View style={{justifyContent: 'space-between', flex: 1}}>
                <View style={{paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', gap: 15, alignItems: 'center'}}>
                    {
                        isEditing ? <View style={{flex: 1}}>
                        <TextInput
                            style={styles.modifyInput}
                            onChangeText={setName}
                            value={name}
                        />
                        </View> : 
                        <Text style={styles.name}>{name && name.length > 0 ? name : "please edit name by click icon"}</Text>
                    }
                    <TouchableOpacity onPress={editHandler}>
                        {
                            isEditing ? <SaveIcon width={20} height={20}/> : 
                            <EditIcon width={20} height={20}/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.opertation}>
                    <TouchableOpacity onPress={tryNowHandler}>
                        <Text style={styles.operationText}>Try now</Text>
                    </TouchableOpacity>
                    <Text style={styles.operationText}>Transfer image</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: viewportWidth - 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        marginTop: 6,
        backgroundColor: '#ddd',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    image: {
        width: viewportWidth/ 4,
        height: viewportWidth/ 4,
        borderRadius: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: "400",
    },
    opertation: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 30
    },
    operationText: {
        fontSize: 16,
        fontWeight: "400",
        color: '#3d5c98'
    },
    modifyInput: {
		height: 27,
        
		borderWidth: 1,
		paddingHorizontal: 15,
	},
})

export default FavouriteItem;

