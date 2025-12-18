import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

export default function PageTransition({ children, style }) {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) });
    return () => { progress.value = withTiming(0, { duration: 200 }); };
  }, []);

  const aStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 12 }],
  }));

  return (
    <Animated.View style={[styles.wrapper, aStyle, style]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
