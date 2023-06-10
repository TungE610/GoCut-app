import {StyleSheet, Dimensions, SafeAreaView, TextInput} from 'react-native';
import {useState, useRef, useCallback} from 'react';
import { SearchBar } from 'react-native-elements';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const SalonSearch = (props) => {

	const [searchValue , setSearchValue] = useState('');

	const updateSearch = (searchValue) => {
		setSearchValue(searchValue);
	}

	return (
		<SafeAreaView style={styles.container}>
			<SearchBar
				platform="ios"
				placeholder={props.placeholder}
				value={searchValue}
				onChangeText={updateSearch}
				style={styles.input}
				containerStyle={{
					borderWidth: 'none',
					padding: 0,
					backgroundColor: '#3D5C98',
				}}
				inputContainerStyle={{
					borderWidth: 1,
					borderColor: '#fff',
					borderRadius: 7,
					padding: 0,
					backgroundColor: '#fff',
					shadowColor: '#171717',
					shadowOffset: {width: -2, height: 4},
					shadowOpacity: 0.2,
					shadowRadius: 3,
				}}
				placeholderTextColor="#5E5F62"
				searchIcon={{ size: 28 }}
				cancelButtonProps={{
					color: '#fff'
				}}
			/>
	  	</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		height: 70,
		width: '100%',
		marginTop: 20,
		paddingHorizontal: 5,
	},
	input: {
		borderRadius: 7,
		color: '#3D5C98',
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	searchIcon: {
		color: '#fff',
	}
})

export default SalonSearch;
