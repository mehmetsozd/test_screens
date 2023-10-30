import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, FlatList } from 'react-native';
import data from './data';
import OnboardingItem from './OnboardingItem';

export default function Onboarding() {
 const [currentIndex, setCurrentIndex] = useState(0);
 const scrollX = useRef(new Animated.Value(0)).current;
 const slidesRef = useRef(null);
 const viewableItemsChanged = useRef(({ viewableItems }) => {
  setCurrentIndex(viewableItems[0].index);
 }).current;

 const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

 console.log(currentIndex)

 return (
  <View style={styles.container}>
   <View style={{ flex: 3 }}>
    <FlatList
     data={data}
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
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
 },
});