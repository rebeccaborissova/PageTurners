import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import images from '../constants/images';

const ThankYou = () => {
  return (
    <View style = {styles.container}>
        <Image source = {images.logoWithoutText} style = {styles.logo} />
      <Text>Thank you for using PageTurners. </Text>
    </View>
  )
}

export default ThankYou

const styles = StyleSheet.create({})