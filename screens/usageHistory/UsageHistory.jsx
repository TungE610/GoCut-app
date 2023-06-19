import { useState } from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import { Tab, TabView, Text} from '@rneui/themed';
import CutIcon from '../../assets/cut.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const UsageHistory = ({navigation}) => {
	const [index, setIndex] = useState(0);

	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard', {name: 'Tung'})
	}

	return (
		<View>
			<ScrollView style={styles.container}>
				<View style={styles.screenHeader}>
					<View style={styles.backButton}>
						<ReturnHomeButton onClick={backButtonClickHandler} page="usageHistory" />
					</View>
					<View style={styles.screenTitleContainer}>
						<Text style={styles.screenTitle}>Booking</Text>
					</View>
				</View>
				<Tab
					value={index}
					onChange={(e) => setIndex(e)}
					indicatorStyle={{
						backgroundColor: '#fff',
						height: 5,
					}}
					variant="primary"
					>
					<Tab.Item
						title="Cut history"
						titleStyle={{ fontSize: 15, fontWeight: 500, marginTop: 6, }}
						style={{backgroundColor: '#647CAA'}}
						icon={<CutIcon color="#fff" width={20} height={20} />}
					/>
					<Tab.Item
						title="favorite"
						titleStyle={{ fontSize: 14, fontWeight: 500 }}
						style={{backgroundColor: '#647CAA'}}
						icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
					/>
    			</Tab>

				<TabView value={index} onChange={(e) => setIndex(e)} animationType="spring">
					<TabView.Item style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
						<Text>Tung dep trai</Text>
					</TabView.Item>
					<TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
						<Text>Favorite</Text>
					</TabView.Item>
				</TabView>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: viewportHeight,
		width: viewportWidth,
		flexDirection: 'column',
		grow: 1,
	},
	screenHeader: {
		shadowOffset: {width: -2, height: 4},  
		shadowColor: '#171717',  
		shadowOpacity: 0.2,  
		shadowRadius: 3,  
	},
	backButton: {
		position: 'absolute',
		width: '20%',
		flexDirection: 'row',
		alignContent: 'space-around',
		alignItems: 'center',
		marginTop: viewportHeight/15,
		paddingLeft: viewportWidth/20,
		zIndex: 999,
	},
	screenTitleContainer: {
		borderBottomWidth: 0.3,
		borderBottomColor: '#555',
		paddingBottom: 15,
	},
	screenTitle: {
		width: '100%',
		fontSize: 28,
		fontWeight: 700,
		color: '#3D5C98',
		letterSpacing: '1',
		textAlign: 'center',
		marginTop: viewportHeight/14,
	},
})


export default UsageHistory;
