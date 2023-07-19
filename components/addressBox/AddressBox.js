import { useState } from 'react';
import { StyleSheet, View , Text, TouchableOpacity, TextInput} from 'react-native';
import WriteIcon from '../../assets/write.svg';
import SaveIcon from '../../assets/save.svg';
import { Input } from 'react-native-elements';

const AddressBox = (props) => {

	const [isRewriting, setIsRewriting] = useState(false);
	const [address, setAddress] = useState(props.address);

	const rewriteAddresHandler = () => {
		setIsRewriting(prev => !prev);
	}

	const modifyAddressHandler = (address) => {
		setAddress(address);
	}

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
		gap: 20,
		paddingVertical: 12,
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	addressBoxContent: {
		gap: 6,
		flex: 10,
	},
	addressType: {
		fontSize: 20,
		fontWeight: 700,
		color: '#3d5c98'
	},
	inputContainer: {
		height: 30,
	},
	address: {
		color: '#555',
		fontSize: 16,
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
		borderColor: '#3d5c98'
	},
})

export default AddressBox;
