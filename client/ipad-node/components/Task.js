import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";

function Task(props) {
  const [completed, setCompleted] = useState(false);

  if (props.task.todo_completed && !completed) {
    setCompleted(true);
  }

  const handleComplete = () => {
    const updatedTask = {
      todo_description: props.task.todo_description,
      todo_responsible: props.task.todo_responsible,
      todo_priority: props.task.todo_priority,
      todo_completed: true
    };

    fetch(`http://localhost:4000/todos/update/${props.task._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          console.log(res);
          props.updatedTasks(props.task._id);
        }
      })
      .catch(console.log);
    setCompleted(!completed);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <TouchableOpacity
          disabled={props.task.todo_completed ? true : false}
          style={completed ? styles.completed : styles.button}
          onPress={handleComplete}
        />
        <Text style={styles.text}>
          {props.task.todo_description.length > 20
            ? props.task.todo_description.substring(0, 21).concat("...")
            : props.task.todo_description}
        </Text>
      </View>
      <TouchableOpacity style={{ alignSelf: "flex-end", marginLeft: 50 }}>
        <Ionicons name="ios-more" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#eeeaea",
    borderRadius: 50,
    height: 25,
    marginRight: 20,
    width: 25
  },
  completed: {
    backgroundColor: "#5ff0bd",
    borderRadius: 50,
    height: 25,
    marginRight: 20,
    width: 25
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    fontWeight: "600"
  }
});

export default Task;
