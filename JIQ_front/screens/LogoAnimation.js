import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import LogoAnimationStyles from './LogoAnimationStyles';

const LogoAnimation = () => {
  const translateY = useRef(new Animated.Value(-200)).current; // Start above the screen
  const bounceValue = useRef(new Animated.Value(1)).current; // For bounce scaling effect

  useEffect(() => {
    Animated.sequence([
      //로고 모션 조절하는 부분
      Animated.timing(translateY, {
        toValue: 0, // 중앙 위치
        duration: 800,
        easing: Easing.bezier(0.1,0.9,0.2,1),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: -50,
        friction: 2,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),
      //bouncing effect
      Animated.spring(bounceValue, {
        toValue: 1.3, // Slightly larger scale
        friction: 2, // Bounce effect
        tension: 150,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 1, // Return to original size
        friction: 3,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    translateY.addListener(({value}) => console.log('translateY:', value));
    bounceValue.addListener(({value}) => console.log('bounceValue:', value));

    return () => {
        translateY.removeAllListeners();
        bounceValue.removeAllListeners();
    };
  }, [translateY, bounceValue]);



  return (
    <View style={LogoAnimationStyles.container}>
      <Animated.View
        style={{
          transform: [
            { translateY: translateY },
            { scale: bounceValue },
          ],
        }}
      >
        <Text
        style={LogoAnimationStyles.logo}>JIQ</Text>
      </Animated.View>
    </View>
  );
};

export default LogoAnimation