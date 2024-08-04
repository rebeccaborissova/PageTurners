// BookRecSummary.js
/*import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const BookRecSummary = ({ navigation }) => (
    <View style={styles.container}>
      <Text style={styles.title}>PageTurner</Text>
      <Text style={styles.description}>
        Book Recommendations Library
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Sorting Algorithm Timer" onPress={() => navigation.navigate('timerResults')} />
      </View>
    </View>
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 20,
      marginBottom: 40,
    },
    buttonContainer: {
      marginTop: 20,
    },
  })
  
export default BookRecSummary*/

import React from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const BookRecSummary = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { likedBooks } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Books</Text>
      <FlatList
        data={likedBooks}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookText}>{item.title} by {item.author}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sorting Algorithm Timer" onPress={() => navigation.navigate('timerResults')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
})

export default BookRecSummary
