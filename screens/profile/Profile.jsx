import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import AvatarBox from '../../components/avatarBox/AvatarBox';
import NotificationBox from '../../components/notificationBox/NotificationBox';
import ShopBox from '../../components/shopBox/ShopBox';
import NavigationBar from '../../components/navigationBar/NavigationBar';
import { ListItem, Avatar } from '@rneui/themed';
import WriteIcon from '../../assets/write.svg';
import SaveIcon from '../../assets/save.svg';

const Profile = ({navigation, ...props}) => {

	const [profileExpanded, setProfileExpanded] = useState(false);
	const [userName, setUserName] = useState(props.userName || "Christopher campbell");
	const [savedUserName, setSavedUserName] = useState(props.userName|| "Christopher campbell")
	const [isEdittingUserName, setIsEdittingUserName] = useState(false);
	const [dateOfBirth, setDateOfBirth] = useState(props.userName || "20/08/2002");
	const [isEdittingDoB, setIsEdittingDob] = useState(false);
	const [telephone, setTelephone] = useState(props.telephone || "0393859464");
	const [isEdittingTelephone, setIsEdittingTelephone] = useState(false);
	const [email, setEmail] = useState(props.email || "tung2082002@gmail.com");


	const returnHomeHandler = () => {
		navigation.navigate("Dashboard");
	}

	const seeUserProfileHandler = () => {
		navigation.navigate("Profile");
	}

	const seeShopHandler = () => {
		navigation.navigate("Shop");
	}

	const modifyUserNameHandler = () => {

	}

	const userNameChangeHandler = (userName) => {
		setUserName(userName);
	}

	const dobChangeHandler = (dob) => {
		setDateOfBirth(dob);
	}

	const telephoneChangeHandler = (telephone) => {
		setTelephone(telephone);
	}

	return (
		<View style={styles.container}>
			<View style={{flex: 1}}>
				<View style={styles.header}>
						<AvatarBox />
						<View style={styles.userName}>
							<Text style={styles.name}>{savedUserName}</Text>
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
								<ListItem.Title style={{fontSize: 16, fontWeight: "", color: '#3d5c98'}}>Full Name: </ListItem.Title>
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
									setSavedUserName(userName)
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
									<ListItem.Subtitle>{dateOfBirth}</ListItem.Subtitle> : 
									<TextInput
										style={styles.modifyInput}
										onChangeText={dobChangeHandler}
										value={dateOfBirth}
								    />}
							</View>
							<TouchableOpacity onPress={() => {setIsEdittingDob(prev => !prev)}}>
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
								{!isEdittingTelephone ? 
									<ListItem.Subtitle>{telephone}</ListItem.Subtitle>
									:
									<TextInput
										style={styles.modifyInput}
										onChangeText={telephoneChangeHandler}
										value={telephone}
								    />
								}
							</View>
							<TouchableOpacity onPress={() => {setIsEdittingTelephone(prev => !prev)}}>
								{!isEdittingTelephone ? 
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
								<ListItem.Subtitle>{email}</ListItem.Subtitle>
							</View>
							<WriteIcon width={23} height={23} />
						</ListItem.Content>
						</ListItem>
					</ListItem.Accordion>
					<TouchableOpacity onPress={() => {
						navigation.navigate("SavedAddress");
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
