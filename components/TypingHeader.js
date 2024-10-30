import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, Easing, StyleSheet, View } from 'react-native';

const TypingHeader = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const textRef = useRef("Split");
  const isDeleting = useRef(false);
  const currentLength = useRef(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeoutId;
    
    const animateText = () => {
      if (!isDeleting.current) {
        // Typing animation
        if (currentLength.current < textRef.current.length) {
          currentLength.current += 1;
          setDisplayText(textRef.current.substring(0, currentLength.current));
          
          // Schedule next character
          timeoutId = setTimeout(animateText, 75);
        } else {
          // Start deleting after a pause
          isDeleting.current = true;
          timeoutId = setTimeout(animateText, 400);
        }
      } else {
        // Deleting animation
        if (currentLength.current > 0) {
          currentLength.current -= 1;
          setDisplayText(textRef.current.substring(0, currentLength.current));
          
          // Schedule next deletion
          timeoutId = setTimeout(animateText, 50);
        } else {
          // Reset to typing after a pause
          isDeleting.current = false;
          timeoutId = setTimeout(animateText, 200);
        }
      }

      // Cursor blink animation
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Start the animation
    animateText();
    
    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      fadeAnim.setValue(1);
    };
  }, []); // Empty dependency array since we're using refs

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {displayText}
        </Text>
        <Animated.Text
          style={[
            styles.cursor,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          |
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  cursor: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default TypingHeader;