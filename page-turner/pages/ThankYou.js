import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import images from '../constants/images';
import Footer from '../components/footer';

const ThankYou = ({navigation}) => {
    // working to est. fade-down transition
   const fadeAnim = useRef(new Animated.Value(0)).current;
   const transYAnim = useRef(new Animated.Value(-70)).current;
   
   // creating countdown effect
   const [seconds, setSeconds] = useState(10);
     
   useEffect(() => {
     Animated.timing(fadeAnim, {
       toValue: 1, // making button appear
       duration: 1000,
       useNativeDriver: true, // improve performance
     }).start();
 
     Animated.timing(transYAnim, {
       toValue: 0, // moving from position -50 to 0
       duration: 1000,
       useNativeDriver: true,
     }).start();

     // creating a countdown
     const countdown = setInterval(() => {
        // using prev state as arg.
        setSeconds((prev) => {
            if (prev <= 1) {
                // instructions for what to do when the count is <= 0
                clearInterval(countdown); 
                navigation.navigate('Home');
                return 0;
            }
            return prev -1; // decreasing the seconds by 1
        });
     }, 1000); // updating every 1 second

    return () => clearInterval(countdown);
   }, [fadeAnim, transYAnim, navigation]);

  return (
    <View style = {styles.container}>
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: transYAnim }] }]}>
        <Image source = {images.logoWithoutText} style = {styles.logo} />
        <Text style = {styles.title}>Thank you for using PageTurners. </Text>
        <Text style = {styles.redirect}> Restarting session in {seconds} seconds...</Text>
        </Animated.View>
    <Footer />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5E6E1',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 450,
        height: 250,
        marginBottom: 20,
      },
})

export default ThankYou;