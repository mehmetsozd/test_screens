import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';

export default OnboardingItem = ({ item }) => {
 const { width } = useWindowDimensions();

 return (
  <View style={[styles.container, { width, backgroundColor: item.backgroundColor }]}>
   <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />
   <View style={{ flex: 0.6 }}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
   </View>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
 },
 image: {
  flex: 0.4,
  justifyContent: 'center'
 },
 title: {
  fontWeight: '800',
  fontSize: 28,
  marginBottom: 10,
  color: 'black',
  textAlign: 'center',
 },
 description: {
  fontWeight: '400',
  color: 'black',
  textAlign: 'center',
  paddingHorizontal: 64,
 },
});