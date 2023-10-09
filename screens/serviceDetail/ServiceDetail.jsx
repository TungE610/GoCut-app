import { StyleSheet, Dimensions, View, Text, ScrollView, Image, ImageBackground } from "react-native";
import ClockIcon from '../../assets/clock.svg';
import SaleIcon from '../../assets/sale.svg';
import TurnBackButton from "../../components/turnBackButton/TurnBackButton";

const ServiceImage = require('../../assets/service1.jpg');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const ServiceDetail = ({navigation, ...props}) => {

	const initialDescription = "a timeless and versatile hairstyle that offers a chic and polished look for women of all ages. This classic cut is characterized by its straight, even length across the bottom, creating a sleek and sophisticated appearance.\n"
	 + "The medium length of the cut falls just below the shoulders, providing a perfect balance between short and long hair. This makes it an ideal choice for those seeking a manageable and stylish option that still offers enough length for various styling possibilities."

	return (
		<View>
			<ScrollView style={styles.container}>
				<View></View>
				<ImageBackground style={styles.serviceImage} source={ServiceImage}>
					<View></View>
					<TurnBackButton onClick={() => {navigation.navigate("SalonDetail")}}/>
				</ImageBackground>
				<View style={styles.serviceInfo}>
					<Text style={styles.serviceName}>{props.serviceName || "Women medium blunt cut"}</Text>
					<View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
						<ClockIcon width={22} height={22} />
						<Text style={styles.serviceTime}>{props.serviceTime || 2} hours service</Text>
					</View>
					<View style={styles.serviceFee}>
						<Text>$20</Text>
						<View style={styles.saleCard}>
							<SaleIcon width={20} height={20} />
							<Text style={styles.salePercent}>-{props.salePercent || 20}%</Text>
						</View>
					</View>
					<View style={styles.serviceDescription}>
						<Text style={styles.aboutTitle}>About service</Text>
						<Text style={styles.aboutContent}>
							{props.descriotion || initialDescription}
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth,
		height: viewportHeight,
		backgroundColor: '#3d5c98',
		paddingTop: 70,
	},
	serviceImage: {
		width: viewportWidth,
		height: viewportHeight * 2/5,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		bottom: -10
	},
	serviceInfo: {
		paddingTop: 20,
		paddingHorizontal: 15,
		width: viewportWidth,
		minHeight: viewportHeight * 3/5,
		flexGrow: 1,
		backgroundColor: '#fff',
		borderRadius: 10,
		gap: 10,
		paddingBottom: 40,
	},
	serviceName: {
		fontSize: 19,
		fontWeight: 700,
		color: '#3d5c98'
	},
	serviceTime: {
		fontSize: 17,
		fontWeight: 600,
		color: '#555'
	},
	serviceFee: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	saleCard: {
		flexDirection: 'row',
		padding: 5,
		borderRadius: 50,
		backgroundColor: '#FFDEC0',
		alignItems: 'center'
	},
	salePercent: {
		color: '#EF7301',
		fontSize: 17,
		fontWeight: 600,
	},
	serviceDescription: {
		paddingTop: 30,
		borderTopWidth: 1,
		borderTopColor: '#ccc,'
	},
	aboutTitle: {
		
	}
})

export default ServiceDetail;
