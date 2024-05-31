import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import AvatarBox from '../../components/avatarBox/AvatarBox';
import NotificationBox from '../../components/notificationBox/NotificationBox';
import ShopBox from '../../components/shopBox/ShopBox';
import NavigationBar from '../../components/navigationBar/NavigationBar';
import { ListItem } from '@rneui/themed';
import WriteIcon from '../../assets/write.svg';
import SaveIcon from '../../assets/save.svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = "http://192.168.1.14"

const Profile = ({route, navigation, ...props}) => {

	const [profileExpanded, setProfileExpanded] = useState(false);
	const [userName, setUserName] = useState(props.userName);
	const [prevValue, setPrevValue] = useState("");
	const [isEdittingUserName, setIsEdittingUserName] = useState(false);
	const [dob, setDob] = useState(props.userName);
	const [isEdittingDoB, setIsEdittingDob] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(props.telephone);
	const [isEdittingPhoneNumber, setIsEdittingPhoneNumber] = useState(false);
	const [email, setEmail] = useState(props.email);
	const [isEdittingEmail, setIsEdittingEmail] = useState(false);
	const [user, setUser] = useState("");
	const [accessToken, setAccessToken] = useState("");

	useEffect(() => {

		const getUser = async () => {

			const token = await AsyncStorage.getItem('bearerToken').then((token) => token).catch((error) => console.log(error));
			setAccessToken(token);

			const headers = {headers :
				{ 
					Authorization: `Bearer ${token}`,
					Accept :'application/json', 
				}
            };

			try {
				await axios(`${host}:8000/api/customer`, headers).then(res => {
					setUser(res.data);
					setUserName(res.data.full_name);
					setDob(res.data.dob);
					setPhoneNumber(res.data.phone_number);
					setEmail(res.data.email);

				}).catch((error) => console.log(error))
			}catch(error) {
				if (error.response && error.response.data) {
					console.log(error.response.data.error);
				} else {
					console.log(error);
				}
			}
		}

		getUser();
	}, [])

	const returnHomeHandler = () => {
		navigation.navigate("Dashboard");
	}

	const seeUserProfileHandler = () => {
		navigation.navigate("Profile");
	}

	const seeShopHandler = () => {
		navigation.navigate("Shop");
	}

	const updateInfomation = async (prop, newValue) => {

		try {
			await axios.put(`${host}:8000/api/customer/update`, null, {
				params: {
					user_id: user.id,
					prop: prop,
					new_value: newValue,
				}
			}).then(res => {
				console.log(res.data);

			}).catch((error) => console.log(error))
		}catch(error) {
			if (error.response && error.response.data) {
				console.log(error.response.data.error);
			} else {
				console.log(error);
			}
		}
	}

	const saveUserNameHandler = async () => {
		const headers = {headers :
			{ 
				Authorization: `Bearer ${accessToken}`,
				Accept :'application/json', 
			}
		};

		updateInfomation("full_name", userName);
	}

	const saveDobHandler = async () => {
		updateInfomation("dob", dob);
	}

	const savePhoneNumberHandler = async () => {
		updateInfomation("phone_number", phoneNumber);
	}

	const saveEmailHandler = async () => {
		updateInfomation("email", email);
	}

	const userNameChangeHandler = (userName) => {
		setUserName(userName);
	}

	const dobChangeHandler = (dob) => {
		setDob(dob);
	}

	const phoneNumberChangeHandler = (phoneNumber) => {
		setPhoneNumber(phoneNumber);
	}

	const emailChangeHandler = (email) => {
		setEmail(email);
	}

	return (
		<View style={styles.container}>
			<View style={{flex: 1}}>
				<View style={styles.header}>
						<AvatarBox />
						<View style={styles.userName}>
							<Text style={styles.name}>{userName}</Text>
							<Text style={styles.followingNum}>following: {props.followingNum || 2}</Text>
						</View>
							<ShopBox onClick={() => {navigation.navigate("Cart")}}/>
							<NotificationBox />
				</View>
				<>
					<ListItem.Accordion
						content={
						<ListItem.Content>
							<ListItem.Title style={{fontSize: 21, fontWeight: 700, color: '#3d5c98'}}>Profile</ListItem.Title>
							<ListItem.Subtitle>Tap to see more</ListItem.Subtitle>
						</ListItem.Content>
						}
						isExpanded={profileExpanded}
						onPress={() => {
							setProfileExpanded(!profileExpanded);
						}}
					>
						<ListItem>
						<ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
								<ListItem.Title style={{fontSize: 16, fontWeight: "700", color: '#3d5c98'}}>Full Name: </ListItem.Title>
								{!isEdittingUserName ? <ListItem.Subtitle>{userName}</ListItem.Subtitle> : 
									<TextInput
										style={styles.modifyInput}
										onChangeText={userNameChangeHandler}
										value={userName}
								    />
								}
							</View>
							<TouchableOpacity onPress={() => {
									setIsEdittingUserName(prev => !prev);
									setPrevValue(userName)

									if (isEdittingUserName) {
										saveUserNameHandler();
									}
								}}>
								{!isEdittingUserName ? 
									<WriteIcon 
										width={23} 
										height={23} 
									/> : 
									<SaveIcon
										width={21} 
										height={21} 
									/>
								}
							</TouchableOpacity>
						</ListItem.Content>
						</ListItem>
						<ListItem>
						<ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
								<ListItem.Title style={{fontSize: 16, fontWeight: 700, color: '#3d5c98'}}>Date of Birth: </ListItem.Title>
								{!isEdittingDoB ? 
									<ListItem.Subtitle>{dob}</ListItem.Subtitle> : 
									<TextInput
										style={styles.modifyInput}
										onChangeText={dobChangeHandler}
										value={dob}
								    />}
							</View>
							<TouchableOpacity onPress={() => {
									setIsEdittingDob(prev => !prev)
									setPrevValue(dob)

									if (isEdittingDoB) {
										saveDobHandler();
									}
								}}>
								{!isEdittingDoB ? 
									<WriteIcon 
										width={23} 
										height={23} 
									/> : 
									<SaveIcon
										width={21} 
										height={21} 
									/>
								}
							</TouchableOpacity>
						</ListItem.Content>
						</ListItem>
						<ListItem>
						<ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
								<ListItem.Title style={{fontSize: 16, fontWeight: "700", color: '#3d5c98'}}>Phone: </ListItem.Title>
								{!isEdittingPhoneNumber ? 
									<ListItem.Subtitle>{phoneNumber}</ListItem.Subtitle>
									:
									<TextInput
										style={styles.modifyInput}
										onChangeText={phoneNumberChangeHandler}
										value={phoneNumber}
								    />
								}
							</View>
							<TouchableOpacity onPress={() => {
									setIsEdittingPhoneNumber(prev => !prev)
									setPrevValue(phoneNumber)

									if (isEdittingPhoneNumber) {
										savePhoneNumberHandler();
									}
								}
								}>
								{!isEdittingPhoneNumber ? 
									<WriteIcon 
										width={23} 
										height={23} 
									/> : 
									<SaveIcon
										width={21} 
										height={21} 
									/>
								}
							</TouchableOpacity>
						</ListItem.Content>
						</ListItem>
						<ListItem>
						<ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
								<ListItem.Title style={{fontSize: 16, fontWeight: "700", color: '#3d5c98'}}>Email: </ListItem.Title>
								{!isEdittingEmail ? 
								<ListItem.Subtitle>{email}</ListItem.Subtitle> : 
								<TextInput
									style={styles.modifyInput}
									onChangeText={emailChangeHandler}
									value={email}
								/>}
							</View>
							<TouchableOpacity onPress={() => {
									setIsEdittingEmail(prev => !prev)
									setPrevValue(email)

									if (isEdittingEmail) {
										saveEmailHandler();
									}
								}
								}>
								{!isEdittingEmail ? 
									<WriteIcon 
										width={23} 
										height={23} 
									/> : 
									<SaveIcon
										width={21} 
										height={21} 
									/>
								}
							</TouchableOpacity>
						</ListItem.Content>
						</ListItem>
					</ListItem.Accordion>
					<TouchableOpacity onPress={() => {
						navigation.navigate("SavedAddress", {
							homeAddress: user.address || "",
							officeAddress: user.office_address || "",
							regularAddress: user.regular_address || "",
							userId: user.id,
						});
					}}>
						<ListItem.Accordion
							content={
								<ListItem.Content
								>
									<ListItem.Title style={{fontSize: 21, fontWeight: "700", color: '#3d5c98'}}>
											Address
									</ListItem.Title>
								</ListItem.Content>
							}
						></ListItem.Accordion>
					</TouchableOpacity>
					<ListItem.Accordion
						content={
						<ListItem.Content>
							<ListItem.Title style={{fontSize: 21, fontWeight: "700", color: '#3d5c98'}}>Usage History</ListItem.Title>
							<ListItem.Subtitle></ListItem.Subtitle>
						</ListItem.Content>
						}
						// isExpanded={expanded}
						onPress={() => {
						setExpanded(!expanded);
						}}
					></ListItem.Accordion>
					<ListItem.Accordion
						content={
						<ListItem.Content>
							<ListItem.Title style={{fontSize: 21, fontWeight: "700", color: '#3d5c98'}}>Coupon</ListItem.Title>
							<ListItem.Subtitle></ListItem.Subtitle>
						</ListItem.Content>
						}
						// isExpanded={expanded}
						onPress={() => {
						setExpanded(!expanded);
						}}
					></ListItem.Accordion>
					<ListItem.Accordion
						content={
						<ListItem.Content>
							<ListItem.Title style={{fontSize: 21, fontWeight: "700", color: '#3d5c98'}}>Order</ListItem.Title>
							<ListItem.Subtitle></ListItem.Subtitle>
						</ListItem.Content>
						}
						// isExpanded={expanded}
						onPress={() => {
						setExpanded(!expanded);
						}}
					></ListItem.Accordion>
    			</>
			</View>
			<NavigationBar 
				backgroundColor="#3d5c98" 
				itemBackgroundColor="#fff" 
				itemIconColor="#3d5c98"
				returnHome={returnHomeHandler}
				seeUserProfile={seeUserProfileHandler}
				seeShop={seeShopHandler}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 70,
		flex: 1,
	},
	header: { 
		height: 80,
		flexDirection: 'row',
		gap: 5,
		paddingHorizontal: 20,
		padding: 0,
	},
	userName: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 5,
		gap: 5,
		height: '100%'
	},
	name: {
		fontSize: 18,
		fontWeight: "700",
		color: '#2A4780',
	},
	followingNum: {
		color: '#2A4780',
		fontSize: 14,
		fontWeight: "400",
	},
	modifyInput: {
		height: 27,
		borderWidth: 1,
		paddingHorizontal: 15,
	},

})

export default Profile;
