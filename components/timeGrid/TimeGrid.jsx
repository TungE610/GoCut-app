import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const GridComponent = () => {
  const [clickedTimePoint, setClickedTimePoint] = useState();

  // Generate time points
  const startTime = 8;
  const endTime = 21;
  const timePoints = [];
  for (let i = startTime; i <= endTime; i++) {
    for (let j = 0; j < 60; j += 20) {
      const time = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
      timePoints.push(time);
    }
  }

  const handleTimePointClick = (timePoint) => {
    setClickedTimePoint(timePoint);
  };

  const isTimePointClicked = (timePoint) => clickedTimePoint === timePoint;

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.row}>
          {timePoints.map((time, index) => {
            if (index % 3 === 0) {
              const isClicked = isTimePointClicked(time);
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => handleTimePointClick(time)}
                  style={[
                    styles.timePointContainer,
                    isClicked && { backgroundColor: '#3d5c98' },
                  ]}
                >
                  <Text style={[styles.timePoint, isClicked && { color: '#fff' }]}>{time}</Text>
                </TouchableOpacity>
              );
            }
            return null;
          })}
        </View>
        <View style={styles.row}>
          {timePoints.map((time, index) => {
            if (index % 3 === 1) {
              const isClicked = isTimePointClicked(time);
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => handleTimePointClick(time)}
                  style={[
                    styles.timePointContainer,
                    isClicked && { backgroundColor: '#3d5c98' },
                  ]}
                >
                  <Text style={[styles.timePoint, isClicked && { color: '#fff' }]}>{time}</Text>
                </TouchableOpacity>
              );
            }
            return null;
          })}
        </View>
        <View style={styles.row}>
          {timePoints.map((time, index) => {
            if (index % 3 === 2) {
              const isClicked = isTimePointClicked(time);
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => handleTimePointClick(time)}
                  style={[
                    styles.timePointContainer,
                    isClicked && { backgroundColor: '#3d5c98' },
                  ]}
                >
                  <Text style={[styles.timePoint, isClicked && { color: '#fff' }]}>{time}</Text>
                </TouchableOpacity>
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
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  timePointContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  timePoint: {
    fontSize: 16,
  },
});

export default GridComponent;
