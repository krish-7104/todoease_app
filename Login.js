import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
const Login = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const loginImage = require("./assets/loginImg.png");
  return (
    <View style={styles.container}>
      <Image
        source={loginImage}
        style={{ height: 200, resizeMode: "contain", marginVertical: 30 }}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        activeOpacity={0.5}
        onPress={() => alert("Hey")}
      >
        <Text style={styles.loginBtnTxt}>Sign In With Google</Text>
      </TouchableOpacity>
      <Text style={styles.loginHead}>Sync Todo's From App To Website</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: "#e8eaed",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loginBtnTxt: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  loginHead: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    marginVertical: 20,
  },
});
