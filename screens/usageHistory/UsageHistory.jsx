import {StyleSheet, View, ScrollView} from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';

const UsageHistory = () => {

	return (
		<View>
			<ScrollView style={styles.container}>
				<View style={styles.backButton}>
					<ReturnHomeButton onClick={backButtonClickHandler}/>
				</View>
				<View style={styles.screenTitleContainer}>
					<Text style={styles.screenTitle}>Booking</Text>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	}
})


export default UsageHistory;
