import { useState } from 'react';
import { StyleSheet, View , Text, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import WriteIcon from '../../assets/write.svg';
import SaveIcon from '../../assets/save.svg';
import axios from 'axios';
const host = "http://192.168.1.5"

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const AddressBox = (props) => {

	const [isRewriting, setIsRewriting] = useState(false);
	const [address, setAddress] = useState(props.address);

	const saveAddressHandler = async (prop, newValue) => {
		try {
			await axios.put(`${host}:8000/api/customer/update`, null, {
				params: {
					user_id: props.userId,
					prop: prop,
					new_value: newValue,
				}
			}).then(res => {
				console.log(res.data);

			}).catch((error) => console.log(error))
		}catch(error) {
			if (error.response && error.response.data) {
				console.log(error.response.data.error);
			} else {
				console.log(error);
			}
		}
	}
	const rewriteAddresHandler = () => {
		setIsRewriting(prev => !prev);

		if (props.addressType === "home") {
			saveAddressHandler("address", address);
		} else if (props.addressType === "office") {
			saveAddressHandler("office_address", address);
		} else {
			saveAddressHandler("regular_address", address);
		}
	}


	const modifyAddressHandler = (address) => {
		setAddress(address);
	}

	console.log(address);

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', flex: 1,gap: 10,  alignItems: 'center'}}>
				{props.icon}
				<View style={styles.addressBoxContent}>
					<Text style={styles.addressType}>
						{props.addressType}
					</Text>
					<View style={styles.inputContainer}>
						{!isRewriting ? 
						<Text style={styles.address}>
							{address}
						</Text> :
						<TextInput
							style={styles.input}
							onChangeText={modifyAddressHandler}
							value={address}
						/>}
					</View>
				</View>
			</View>
			<TouchableOpacity onPress={rewriteAddresHandler}>
				{!isRewriting ? 
					<WriteIcon width={26} height={26} /> :
					<SaveIcon width={24} height={24} />
				}
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignSelf: 'flex-start',
		borderTopColor: '#3d5c98',
		borderTopWidth: 1,
		paddingTop: 10,
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	addressBoxContent: {
		gap: 10,
		flex: 10,
	},
	addressType: {
		fontSize: 20,
		fontWeight: "700",
		color: '#3d5c98'
	},
	inputContainer: {
		height: 30,
	},
	address: {
		color: '#333',
		fontSize: 16,
		width: viewportWidth * 3/4
	},
	addressInput: {
		fontSize: 16,
		marginBottom: 0,
	},
	input: {
		height: 30,
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 5,
		borderColor: '#3d5c98',
		width: viewportWidth * 3/4
	},
})

export default AddressBox;
