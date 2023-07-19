import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import FiveStar from "../fiveStar/FiveStar";
const salonImage = require ('../../assets/salon2.jpg');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const HistoryBox = (props) => {

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
				<Text style={styles.time}>
					{props.time}
				</Text>
				<FiveStar />
			</View>
			<View style={styles.salonInfo}>
				<Image style={styles.salonImage} source= {props.salonImage} />
				<View style={{flex: 1, gap: 5}}>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<Text style={styles.salonName}>{props.salonName}</Text>
						<Text style={styles.fee}>${props.totalFee}</Text>
					</View>
					<Text style={styles.salonAddress}>{props.salonAddress}</Text>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<Text style={styles.service}>{props.services}</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingHorizontal: 20,
		paddingTop: 10,
		height: viewportHeight/6,
		backgroundColor: '#fff',
		borderRadius: 10,
		gap: 10,
		width: '100%',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.30,
		elevation: 13,
	},
	time: {
		fontSize: 17,
		fontWeight: 700,
		color: '#3D5C98'
	},
	salonInfo: {
		flex: 1,
		width: '100%',
		height: '85%',
		flexDirection: 'row',
		gap: 10,
	},
	salonImage: {
		width: '26%',
		height: '90%',
		borderRadius: 10,
	},
	salonName: {
		fontSize: 21,
		fontWeight: 700,
		color: '#3D5C98'
	},
	salonAddress: {
		fontSize: 15,
		fontWeight: 600,
		color: '#555'
	},
	fee: {
		fontSize: 17,
		fontWeight: 700,
		color: '#3D5C98'
	},
	service: {
		fontSize: 17,
		fontWeight: 700,
		color: '#3D5C98'
	}
})

export default HistoryBox;
