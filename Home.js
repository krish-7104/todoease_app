import { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";
import Todo from "./Todo";
import InputTodo from "./InputTodo";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
const Home = ({ navigation }) => {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "TodoEase",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 4,
              borderWidth: 1.5,
            }}
          >
            <Text
              style={{
                marginRight: 6,
                fontFamily: "Poppins-SemiBold",
                fontSize: 12,
                marginTop: 4,
                color: "#181818",
              }}
            >
              Login With
            </Text>
            <AntDesign name="google" size={14} color="#181818" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

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
