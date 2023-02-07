import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Todo = (props) => {
  return (
    <View style={styles.todoDiv}>
      <Text style={styles.todoText}>{props.text}</Text>
      <TouchableOpacity
        style={styles.delBtn}
        activeOpacity={0.5}
        onPress={() => props.removeTodoHandler(props.text)}
      >
        <MaterialCommunityIcons name="delete" size={24} color="#f87171" />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoDiv: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 6,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  todoText: {
    width: "90%",
    fontFamily: "Poppins-Medium",
  },
  delBtn: {
    width: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
