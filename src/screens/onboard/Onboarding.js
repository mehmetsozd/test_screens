import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, FlatList } from 'react-native';
import slides from './data';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding() {
 const [currentIndex, setCurrentIndex] = useState(0);
 const scrollX = useRef(new Animated.Value(0)).current;
 const slidesRef = useRef(null);
 const viewableItemsChanged = useRef(({ viewableItems }) => {
  setCurrentIndex(viewableItems[0].index);
 }).current;

 const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

 const scrollTo = async () => {
  if (currentIndex < slides.length - 1) {
   slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
  } else {
   try {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
   } catch (error) {
    console.log('Error @setItem: ', error);
   }
  }
 }

 return (
  <View style={styles.container}>
   <View style={{ flex: 3 }}>
    <FlatList
     data={slides}
     renderItem={({ item }) => <OnboardingItem item={item} />}
     horizontal
     showsHorizontalScrollIndicator={false}
     pagingEnabled
     bounces={false}
     keyExtractor={(item) => item.id}
     onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
     })}
     onViewableItemsChanged={viewableItemsChanged}
     viewabilityConfig={viewConfig}
     scrollEventThrottle={32}
     ref={slidesRef}
    />
   </View>
   <Paginator data={slides} scrollX={scrollX} />
   <NextButton percentage={(currentIndex + 1) * (100 / slides.length)} scrollTo={scrollTo} />
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  backgroundColor: 'white',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
 },
});