import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import { useState } from 'react';

const TimePointCard = (props) => {

    return (
        <TouchableOpacity
            delayPressIn={0}
            key={props.time}
            disabled={props.disabled}
            onPress={() => {
                props.selectTimePointHandler(props.value)
            }}
            style={[
                styles.timePointContainer,
                props.selected && { backgroundColor: '#3d5c98' },
                props.disabled && { backgroundColor: '#ccc' },
            ]}
        >
            <Text style={[styles.time, props.selected && { color: '#fff' }]}>{props.time}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    timePointContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#111',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    time: {
        fontSize: 17, 
        fontWeight: 500
    }
})

export default TimePointCard;
