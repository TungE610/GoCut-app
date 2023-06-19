import { useState } from 'react';
import { StyleSheet, View , Text, TouchableOpacity} from 'react-native';
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
			<View style={{flexDirection: 'row', flex: 1, gap: 10, alignItems: 'center'}}>
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
						<Input
							style={styles.addressInput}
							value={address}
							onChangeText={modifyAddressHandler}
						/>}
					</View>
				</View>
			</View>
			<TouchableOpacity onPress={rewriteAddresHandler}>
				{!isRewriting ? 
					<WriteIcon width={30} height={30} /> :
					<SaveIcon width={28} height={28} />
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
		flex: 1,
	},
	addressType: {
		fontSize: 20,
		fontWeight: 700,
		color: '#3d5c98'
	},
	inputContainer: {
		height: 25,
	},
	address: {
		fontSize: 14,
		color: '#555',
	},
	addressInput: {
		height: 20,
	}
})

export default AddressBox;
