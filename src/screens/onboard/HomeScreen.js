import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default HomeScreen = () => {
 const clearOnboarding = async () => {
  try {
   await AsyncStorage.removeItem("@viewedOnboarding");
  } catch (error) {
   console.log("Error @removeItem: ", error);
  }
 };
 return (
  <View style={styles.container}>
   <Text style={styles.text}>Home Screen</Text>
   <TouchableOpacity onPress={clearOnboarding} style={styles.button} activeOpacity={0.6}>
    <Text style={styles.text}>Clear Onboarding</Text>
   </TouchableOpacity>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
 },
 button: {
  justifyContent: "center",
  alignItems: "center",
 },
 buttonText: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
 },
 text: {
  color: "black",
  fontSize: 16,
  fontWeight: "bold",
 },
});