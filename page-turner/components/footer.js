import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const footer = () => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.footerText}>Made with 🩷 by Arossa, Isa, & Rebecca </Text>
      <Text style = {styles.footerText}>DSA Summer '24 </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        borderTopColor: 'black',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    footerText: {
        fontSize: 12,
        marginTop: 3,
        fontFamily: 'Roboto-Medium',
    },
});

export default footer