import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, 
  KeyboardAvoidingView, Platform, 
  TouchableOpacity, Keyboard } from 'react-native';
import { TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const App = () => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== '') {
      setTaskItems([...taskItems, { id: Date.now(), text: task, completed: false }]);
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

  const deleteTask = (id, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter(task => task.id !== id));
    } else {
      setTaskItems(taskItems.filter(task => task.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.taskWrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Today's todo </Text>
            <MaterialIcons name="access-time" size={24} color="black" />
          </View>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task {...item} onDelete={deleteTask} />
              </TouchableOpacity>
            ))}
          </View>
        </View>


        <View style={styles.line} />

        <View style={styles.completedTasksWrapper}>
          <Text style={styles.sectionTitle}>Completed tasks</Text>
          <View style={styles.items}>
            {completedTasks.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => deleteTask(item.id, true)}>
                <Task {...item} onDelete={deleteTask} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

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

const Task = ({ id, text, completed, onDelete }) => {
  const handleDelete = () => {
    onDelete(id, completed);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={[styles.square, { backgroundColor: completed ? '#558CF6' : '#fff' }]}
          onPress={() => onDelete(id, completed)}
        />
        <Text style={[styles.itemText, { textDecorationLine: completed ? 'line-through' : 'none' }]}>
          {text}
        </Text>
      </View>
      <View style={styles.itemRight}>
        {completed && (
          <TouchableOpacity onPress={handleDelete}>
            <MaterialIcons name="delete" size={24} color="#FF6347" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
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
  line: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginHorizontal: 20, 
  },
});

export default App;
