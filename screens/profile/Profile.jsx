import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import AvatarBox from '../../components/avatarBox/AvatarBox';
import NotificationBox from '../../components/notificationBox/NotificationBox';
import ShopBox from '../../components/shopBox/ShopBox';
import NavigationBar from '../../components/navigationBar/NavigationBar';
import { ListItem, Avatar } from '@rneui/themed';
import WriteIcon from '../../assets/write.svg';

const Profile = ({navigation, ...props}) => {
	const [expanded, setExpanded] = React.useState(false);

	return (
		<View style={styles.container}>
			<ReturnHomeButton onClick={() => {
				navigation.navigate('Dashboard')
			}}/>
			<View style={{flex: 1}}>
				<View style={styles.header}>
						<AvatarBox />
						<View style={styles.userName}>
							<Text style={styles.name}>{props.userName || 'Christopher campbell'}</Text>
							<Text style={styles.followingNum}>following: {props.followingNum || 2}</Text>
						</View>
							<ShopBox />
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
						isExpanded={expanded}
						onPress={() => {
						setExpanded(!expanded);
						}}
					>
						<ListItem>
						<ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
								<ListItem.Title style={{fontSize: 16, fontWeight: 700, color: '#3d5c98'}}>Full Name: </ListItem.Title>
								<ListItem.Subtitle>Christopher campbell</ListItem.Subtitle>
							</View>
							<WriteIcon width={23} height={23} />
						</ListItem.Content>
						</ListItem>
						<ListItem>
						<ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
								<ListItem.Title style={{fontSize: 16, fontWeight: 700, color: '#3d5c98'}}>Date of Birth: </ListItem.Title>
								<ListItem.Subtitle>20/08/2002</ListItem.Subtitle>
							</View>
							<WriteIcon width={23} height={23} />
						</ListItem.Content>
						</ListItem>
						<ListItem>
						<ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
								<ListItem.Title style={{fontSize: 16, fontWeight: 700, color: '#3d5c98'}}>Phone: </ListItem.Title>
								<ListItem.Subtitle>01234566632</ListItem.Subtitle>
							</View>
							<WriteIcon width={23} height={23} />
						</ListItem.Content>
						</ListItem>
						<ListItem>
						<ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20}}>
							<View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
								<ListItem.Title style={{fontSize: 16, fontWeight: 700, color: '#3d5c98'}}>Email: </ListItem.Title>
								<ListItem.Subtitle>tung2082002@gmail.com</ListItem.Subtitle>
							</View>
							<WriteIcon width={23} height={23} />
						</ListItem.Content>
						</ListItem>
					</ListItem.Accordion>
					<ListItem.Accordion
						content={
						<ListItem.Content>
							<ListItem.Title style={{fontSize: 21, fontWeight: 700, color: '#3d5c98'}}>Address</ListItem.Title>
							<ListItem.Subtitle></ListItem.Subtitle>
						</ListItem.Content>
						}
						isExpanded={expanded}
						onPress={() => {
						setExpanded(!expanded);
						}}
					></ListItem.Accordion>
					<ListItem.Accordion
						content={
						<ListItem.Content>
							<ListItem.Title style={{fontSize: 21, fontWeight: 700, color: '#3d5c98'}}>Usage History</ListItem.Title>
							<ListItem.Subtitle></ListItem.Subtitle>
						</ListItem.Content>
						}
						isExpanded={expanded}
						onPress={() => {
						setExpanded(!expanded);
						}}
					></ListItem.Accordion>
					<ListItem.Accordion
						content={
						<ListItem.Content>
							<ListItem.Title style={{fontSize: 21, fontWeight: 700, color: '#3d5c98'}}>Coupon</ListItem.Title>
							<ListItem.Subtitle></ListItem.Subtitle>
						</ListItem.Content>
						}
						isExpanded={expanded}
						onPress={() => {
						setExpanded(!expanded);
						}}
					></ListItem.Accordion>
					<ListItem.Accordion
						content={
						<ListItem.Content>
							<ListItem.Title style={{fontSize: 21, fontWeight: 700, color: '#3d5c98'}}>Order</ListItem.Title>
							<ListItem.Subtitle></ListItem.Subtitle>
						</ListItem.Content>
						}
						isExpanded={expanded}
						onPress={() => {
						setExpanded(!expanded);
						}}
					></ListItem.Accordion>
    			</>
			</View>
			<NavigationBar backgroundColor="#3d5c98" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 40,
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
		fontWeight: 700,
		color: '#2A4780',
	},
	followingNum: {
		color: '#2A4780',
		fontSize: 14,
		fontWeight: 400,
	},

})

export default Profile;
