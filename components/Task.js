import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <TouchableOpacity onPress={toggleCompleted}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <TouchableOpacity
            style={[styles.square, { backgroundColor: isCompleted ? '#558CF6' : '#fff' }]}
          />
          <Text style={[styles.itemText, { textDecorationLine: isCompleted ? 'line-through' : 'none' }]}>
            {props.text}
          </Text>
        </View>
        <View style={styles.circular}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#558CF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;