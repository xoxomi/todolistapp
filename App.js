import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== '') {
      setTaskItems([...taskItems, { text: task, completed: false }]);
      setTask('');
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    let completedTask = itemsCopy.splice(index, 1)[0];
    completedTask.completed = true;
    setTaskItems(itemsCopy);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Today's todo </Text>
          <MaterialIcons name="access-time" size={24} color="black" />
        </View>
        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item.text} completed={item.completed} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.completedTasksWrapper}>
        <Text style={styles.sectionTitle}>Completed tasks</Text>
        <View style={styles.items}>
          {completedTasks.map((item, index) => (
            <Task key={index} text={item.text} completed={item.completed} />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const Task = ({ text, completed }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={[styles.square, completed && styles.completedSquare]}></TouchableOpacity>
        <Text style={[styles.itemText, completed && styles.completedText]}>{text}</Text>
      </View>
      <View style={styles.circular}>
        {completed && <View style={styles.completedCross} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  taskWrapper: {
    paddingTop: 85,
    paddingHorizontal: 20,
  },
  completedTasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 300,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
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
    backgroundColor: '#558CF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  completedSquare: {
    backgroundColor: '#C0C0C0', 
    opacity: 0.4,
  },
  itemText: {
    maxWidth: '80%',
  },
  completedText: {
    textDecorationLine: 'line-through', 
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#558CF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  completedCross: {
    width: 8,
    height: 8,
    backgroundColor: '#558CF6',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }], 
  },
});
