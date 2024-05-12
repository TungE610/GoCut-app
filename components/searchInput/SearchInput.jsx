import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import { SearchBar } from 'react-native-elements';

const SearchInput = (props) => {

	const [searchValue , setSearchValue] = useState('');

	const updateSearch = (value) => {
		props.onChange(value);
		setSearchValue(value);
	}

	return (
		<View style={styles.container}>
			<SearchBar
				platform="ios"
				placeholder={props.placeholder}
				value={searchValue}
				onChangeText={updateSearch}
				style={styles.input}
				containerStyle={{
					borderWidth: 0,
					padding: 0,
					backgroundColor: props.backgroundColor ? props.backgroundColor : '#3D5C98',
					width: props.width,
					height : props.height,
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
				placeholderTextColor="#888"
				searchIcon={{ size: 28 }}
				cancelButtonProps={{
					color: props.cancelButtonColor ? props.cancelButtonColor : '#fff'
				}}
			/>
	  	</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		height: 70,
	},
	input: {
		borderRadius: 7,
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
		padding: 5,
	},
})

export default SearchInput;
