import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
const InputTodo = (props) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  return (
    <View style={styles.inputArea}>
      <TextInput
        style={styles.input}
        placeholder="Add Todo Here"
        value={props.todoInput}
        onChangeText={(text) => props.setTodoInput(text)}
        onSubmitEditing={props.addTodoHandler}
      />
      <TouchableOpacity onPress={props.addTodoHandler} style={styles.addBtn}>
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default InputTodo;

const styles = StyleSheet.create({
  inputArea: {
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "Poppins-Regular",

    padding: 10,
  },
  input: {
    padding: 10,
    width: "82%",
  },
  addBtn: {
    backgroundColor: "#e8eaed",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
