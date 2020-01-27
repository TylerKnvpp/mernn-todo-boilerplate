import React, { useState } from "react";
import {
  Picker,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

function TaskForm(props) {
  const [inputState, setInput] = useState("");
  const [pickerState, setPickerValue] = useState("low");

  async function handleSubmit() {
    if (inputState && pickerState) {
      const newTask = {
        todo_description: inputState,
        todo_responsible: "Tyler",
        todo_priority: pickerState,
        todo_completed: false
      };

      fetch("http://localhost:4000/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newTask)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);

          props.navigation.goBack();
        })
        .catch(console.log);
    }
  }

  return (
    <View>
      <TextInput
        autoFocus
        style={{
          borderWidth: 1,
          borderColor: "#5ce0e9",
          borderTopColor: "white",
          color: "black",
          fontSize: 50,
          marginTop: 10,
          paddingLeft: 10
        }}
        value={inputState}
        onChangeText={text => setInput(text)}
      />
      <Picker
        selectedValue={pickerState}
        onValueChange={(itemValue, itemIndex) => {
          setPickerValue(itemValue);
        }}
      >
        <Picker.Item label="low" value="low" />
        <Picker.Item label="medium" value="medium" />
        <Picker.Item label="high" value="high" />
      </Picker>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          borderRadius: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          backgroundColor: "#25aae1",
          padding: 5,
          height: 40,
          width: 80
        }}
      >
        <Text style={{ color: "white", fontWeight: "800", padding: 5 }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TaskForm;
