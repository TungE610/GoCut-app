import { StyleSheet, View , Text } from 'react-native';
import WriteIcon from '../../assets/write.svg';

const AddressBox = (props) => {

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
				{props.icon}
				<View style={styles.addressBoxContent}>
					<Text style={styles.addressType}>
						{props.addressType}
					</Text>
					<Text>
						{props.address}
					</Text>
				</View>
			</View>
			<WriteIcon width={30} height={30} />
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
		gap: 10,
	},
	addressType: {
		fontSize: 20,
		fontWeight: 600,
	},
	address: {
		fontSize: 28,
	}
})

export default AddressBox;

