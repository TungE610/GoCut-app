import { useState } from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Text } from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import { Tab, TabView} from '@rneui/themed';
import CutIcon from '../../assets/cut.svg';
import BookingButton from '../../components/bookingButton/BookingButton';
import SadIcon from '../../assets/sad.svg';
import HistoryBox from '../../components/historyBox/HistoryBox';
import FacialIcon from '../../assets/facial.svg';
import SearchInput from '../../components/searchInput/SearchInput';

const NoUsedHistory = () => {
	
	return (
		<View style={{marginTop: 30, paddingHorizontal: 30}}>
			<View style={{flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'center'}}>
				<Text style={{fontSize: 19,fontWeight: 700, textAlign: 'center'}}>You have never used our app 
				</Text>
				<SadIcon />
			</View>
			<Text style={{fontSize: 15,fontWeight: 500, textAlign: 'center',color: '#555', marginTop: 10,}}>Book an appointment now to experience the best service</Text>
			<BookingButton />
		</View>
	)
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const UsageHistory = ({navigation}) => {
	const [index, setIndex] = useState(0);
	console.log(index);
	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard', {name: 'Tung'})
	}

	return (
			<View style={styles.container}>
				<View style={styles.screenHeader}>
					<View style={styles.backButton}>
						<ReturnHomeButton onClick={backButtonClickHandler} page="usageHistory" />
					</View>
					<View style={styles.screenTitleContainer}>
						<Text style={styles.screenTitle}>History</Text>
					</View>
				</View>
				<Tab
					value={index}
					onChange={setIndex}
					indicatorStyle={{
						backgroundColor: '#3d5c98',
						height: 4,
					}}
					variant="primary"
					>
					<Tab.Item
						title="Hair cut"
						titleStyle={{ fontSize: 15, fontWeight: 500, marginTop: 9, color: '#3d5c98' }}
						style={{backgroundColor: '#eee'}}
						icon={<CutIcon color="#3d5c98" width={20} height={20} />}
					/>
					<Tab.Item
						title="Services"
						titleStyle={{ fontSize: 15, fontWeight: 500, marginTop: 6, color: '#3d5c98' }}
						style={{backgroundColor: '#eee'}}
						icon={<FacialIcon color="#3d5c98" width={23} height={23} />}
					/>
    			</Tab>

				<TabView value={index} onChange={setIndex} animationType="spring" style={{height: 100}}>
					<TabView.Item>
						<NoUsedHistory />
					</TabView.Item>
					<TabView.Item>
						<View>
							<SearchInput placeholder='Search salon with name or location' backgroundColor="#eee" cancelButtonColor="#3d5c98" />
							<HistoryBox />
						</View>
					</TabView.Item>
				</TabView>
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
