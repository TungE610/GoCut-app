import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { dehashTimepoint } from '../../helpers/dehashTimePoint';
import TimePointCard from '../timepointCard/TimepointCard';
import { showMessage } from "react-native-flash-message";

const checkEnoughTimeSlot = (selectedValue, totalTime, disabledIndexes) => {
    const slots = totalTime / 20; // Calculate the number of slots based on totalTime
    
    // Loop through each slot
    for (let i = 0; i < slots; i++) {
        const currentValue = selectedValue + i; // Calculate the current value in the range
        // Check if the current value exists in disabledIndexes array
        if (disabledIndexes.includes(currentValue)) {
            return false; // If found, return false
        }
    }
    return true; // If no disabled values found, return true
}

const GridComponent = (props) => {

    const [disabledIndexes, setDisabledIndexes] = useState([]);
    const [selectedIndexes, setSelectedIndexes] = useState([]);

    useEffect(() => {
        setDisabledIndexes(props.disabledIndexes);
        setSelectedIndexes(props.selectedIndexes);

    }, [props.disabledIndexes,props.selectedIndexes ])

    const hashValue = [];

    for (let i = 24; i <= 68; i++) {
        hashValue.push(i); // Add each number to the array
    }

    const selectTimePointHandler = (value) => {
        

        if (checkEnoughTimeSlot(value, props.totalTime, disabledIndexes)) {
            const newSelected = [];

            for (let i = value ; i <= value + props.totalTime / 20 ; i++) {
                newSelected.push(i); // Add each number to the array
            }

            setSelectedIndexes(newSelected);

            props.selectTimePointHandler(value);
        } else {
            showMessage({
              message: "Not enough time to do all services, please select other slots",
              type: "danger",
                  autoHide: false,
                  duration: 60000,
                  icon: "danger",
            });
        }
    }

    return (
    <ScrollView horizontal>
        <View style={styles.container}>
            <View style={styles.row}>
                {hashValue.map((value, index) => {
                if (value % 3 === 0) {
                    return (
                        <TimePointCard 
                            key={value}
                            value={value}
                            time={dehashTimepoint(value)} 
                            disabled={disabledIndexes.includes(value)}
                            selected={selectedIndexes.includes(value)}
                            selectTimePointHandler={selectTimePointHandler}
                        />                 
                    );
                }
            return null;
          })}
        </View>
        <View style={styles.row}>
          {hashValue.map((value, index) => {
            if (value % 3 === 1) {
                return (
                    <TimePointCard
                        key={value}
                        value={value} 
                        time={dehashTimepoint(value)} 
                        disabled={disabledIndexes.includes(value)}
                        selected={selectedIndexes.includes(value)}
                        selectTimePointHandler={selectTimePointHandler}
                    />                 
                );
            }
            return null;
          })}
        </View>
        <View style={styles.row}>
           {hashValue.map((value, index) => {
            if (value % 3 === 2) {
                return (
                     <TimePointCard 
                        key={value}
                        value={value}
                        time={dehashTimepoint(value)} 
                        disabled={disabledIndexes.includes(value)}
                        selected={selectedIndexes.includes(value)}
                        selectTimePointHandler={selectTimePointHandler}
                    /> 
                );
            }
            return null;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 2,
    width: '80%',
  },
  timePoint: {
    fontSize: 16,
  },
});

export default GridComponent;
