import React, { useRef, useEffect } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import LogoAnimationstyles from "./LogoAnimationStyles";

const LogoAnimation = () => {
  // 애니메이션 값 초기화
  const fadeJ = useRef(new Animated.Value(0)).current;
  const fadeI = useRef(new Animated.Value(0)).current;
  const fadeQ = useRef(new Animated.Value(0)).current;

  const translateJ = useRef(new Animated.Value(-100)).current;
  const translateI = useRef(new Animated.Value(0)).current;
  const translateQ = useRef(new Animated.Value(100)).current;


  useEffect(() => {
    // 애니메이션 순차 실행
    Animated.sequence([
      // J 애니메이션
      Animated.parallel([
        Animated.timing(fadeJ, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateJ, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // I 애니메이션
      Animated.parallel([
        Animated.timing(fadeI, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateI, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Q 애니메이션
      Animated.parallel([
        Animated.timing(fadeQ, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateQ, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeJ, fadeI, fadeQ, translateJ, translateI, translateQ]);

  return (
    <View style={LogoAnimationstyles.container}>
      {/* J 애니메이션 */}
      <Animated.Text
        style={[
          LogoAnimationstyles.text,
          {
            opacity: fadeJ,
            transform: [{ translateX: translateJ }],
          },
        ]}
      >
        J
      </Animated.Text>

      {/* I 애니메이션 */}
      <Animated.Text
        style={[
          LogoAnimationstyles.text,
          {
            opacity: fadeI,
            transform: [{ translateX: translateI }],
          },
        ]}
      >
        I
      </Animated.Text>

      {/* Q 애니메이션 */}
      <Animated.Text
        style={[
          LogoAnimationstyles.text,
          {
            opacity: fadeQ,
            transform: [{ translateX: translateQ }],
          },
        ]}
      >
      <Text style={[LogoAnimationstyles.text, /*LogoAnimationstyles.qText*/]}>Q</Text>
      </Animated.Text>
    </View>
  );
};


export default LogoAnimation;
