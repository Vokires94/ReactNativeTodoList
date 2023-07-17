import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import Task from './components/Tasks';
import { IconComponentProvider, Provider } from '@react-native-material/core';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DialogComponent from './components/Dialog';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogTaskText, setDialogTaskText] = useState('');

  const handleAddTask = () => {
    if (task) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, { task, done: false }])
      setTask(null);
      Toast.show({
        type: 'success',
        text1: 'Task Added',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Cannot add empty field',
      });
    }
  }

  const toggleTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].done = !itemsCopy[index].done;
    setTaskItems(itemsCopy)
  }

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    Toast.show({
      type: 'error',
      text1: 'Task Removed',
    });
  }

  const openDialog = (index) => {
    setDialogTaskText(taskItems[index].task);
    setDialogOpen(true);
  }

  const closeDialog = () => {
    setDialogTaskText('');
    setDialogOpen(false);
  }
  closeDialog

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >

          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {
                taskItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => openDialog(index)}>
                      <Task text={item.task} status={item.done} deleteTask={deleteTask} toggleTask={() => toggleTask(index)} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>

        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Toast visibilityTime={2000} autoHide />
        <Provider>
          <DialogComponent open={isDialogOpen} close={() => closeDialog()} title='Task' text={dialogTaskText} />
        </Provider>
      </View>
    </IconComponentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: StatusBar.currentHeight + 8,
    marginBottom: 8,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  items: {
    marginTop: 0,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});