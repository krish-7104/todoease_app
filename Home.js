import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";
import Todo from "./Todo";
import InputTodo from "./InputTodo";
import { StatusBar } from "expo-status-bar";
const Home = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const [todo, setTodo] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const addTodoHandler = () => {
    setTodo((prev) => [...prev, todoInput]);
    setTodoInput("");
    Keyboard.dismiss();
    storeData();
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todo));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      console.log(jsonValue);
      if (jsonValue !== null) {
        setTodo(JSON.parse(jsonValue));
      } else {
        setTodo([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    storeData();
  }, [todo]);

  const removeTodoHandler = (value) => {
    console.log(todo.filter((x) => x !== value));
    setTodo(todo.filter((x) => x !== value));
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TodoEase</Text>
      <ScrollView style={styles.todoList}>
        {todo &&
          todo.map((text, index) => {
            return (
              <Todo
                key={index}
                text={text}
                removeTodoHandler={removeTodoHandler}
              />
            );
          })}
      </ScrollView>
      {todo.length === 0 && (
        <View style={styles.noTodoDiv}>
          <Text style={styles.noTodoText}>
            Maximize Productivity: Create Todo List
          </Text>
        </View>
      )}
      <InputTodo
        todo={todo}
        setTodo={setTodo}
        setTodoInput={setTodoInput}
        todoInput={todoInput}
        addTodoHandler={addTodoHandler}
      />
      <StatusBar translucent={true} backgroundColor={"#e8eaed"} style="dark" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Poppins-SemiBold",
    marginTop: 50,
    fontSize: 26,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#e8eaed",
  },
  todoList: {
    flex: 1,
    width: "90%",
    marginTop: 20,
  },
  noTodoDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noTodoText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    color: "#181818",
    fontFamily: "Poppins-Regular",
    opacity: 0.7,
    letterSpacing: 1,
  },
});
