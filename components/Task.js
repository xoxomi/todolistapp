import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Task = (props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const handleDelete = () => {
    // Call the onDelete function passed from the parent component
    props.onDelete(props.id);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={[styles.square, { backgroundColor: isCompleted ? '#558CF6' : '#fff' }]}
          onPress={toggleCompleted}
        />
        <Text style={[styles.itemText, { textDecorationLine: isCompleted ? 'line-through' : 'none' }]}>
          {props.text}
        </Text>
      </View>
      <View style={styles.itemRight}>
        {props.isCompleted && (
          <TouchableOpacity onPress={handleDelete}>
            <MaterialIcons name="delete" size={24} color="#FF6347" />
          </TouchableOpacity>
        )}
      </View>
    </View>
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
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Task;
