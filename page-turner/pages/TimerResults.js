import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import images from '../constants/images';
import Footer from '../components/footer';

const TimerResults = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transYAnim = useRef(new Animated.Value(-70)).current;
  const route = useRoute();

  const { sortingAlgo, sortTimes } = route.params;
  console.log("sortingAlgo", sortingAlgo);

  const correctAlgorithm = sortTimes.timSort < sortTimes.radixSort ? "Tim Sort" : "Radix Sort";
  const userIsCorrect = sortingAlgo === correctAlgorithm;

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(transYAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [fadeAnim, transYAnim]);

  const navigateToThankYou = () => {
    navigation.navigate('ThankYou');
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />

      <Animated.View style={[
        styles.contentContainer,
        { opacity: fadeAnim, transform: [{ translateY: transYAnim }] }
      ]}>
        <Text style={styles.title}>Sorting Algorithms</Text>

        <View style={styles.selectedSortText}>
          <Text style={styles.subTitle}>Selected Sort </Text>
          <Text style={styles.selectedSort}>{sortingAlgo}</Text>
        </View>
        
        <View style={styles.timeAnalysisContainer}>
          <Image source={images.clockIcon} style={styles.clockIcon} />
          <View style={styles.timeAnalysisWords}>
            <Text style={styles.timeAnalysis}>Time Analysis</Text>
            <Text style={styles.time}>Radix Sort: {sortTimes.radixSort.toFixed(5)}s</Text>
            <Text style={styles.time}>Tim Sort: {sortTimes.timSort.toFixed(5)}s</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.resultButton} disabled>
          <Text style={styles.resultButtonText}>
            {userIsCorrect
              ? `Congratulations! ${correctAlgorithm} is the faster option.`
              : `Clearly ... ${correctAlgorithm} was the better option.`}
          </Text>
        </TouchableOpacity>

        {showButton && (
          <TouchableOpacity style={styles.customButton} onPress={navigateToThankYou}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E1',
    alignItems: 'center',
  },
  logo: {
    marginTop: 10,
    width: 150,
    height: 150,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  title: {
    color: '#6D2C2A',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto-BlackItalic',
  },
  subTitle: {
    color: '#000000',
    fontSize: 22,
    marginBottom: 2,
    fontFamily: 'Roboto-Bold',
  },
  selectedSortText: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    width: '100%',
  },
  selectedSort: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Roboto-Italic',
    marginBottom: 5,
  },
  timeAnalysisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  clockIcon: {
    width: 200,
    height: 200,
    marginLeft: -40,
  },
  timeAnalysisWords: {
    marginLeft: -30,
  },
  timeAnalysis: {
    fontSize: 22,
    color: '#000000',
    marginBottom: 3,
    marginLeft: -5,
    fontFamily: 'Roboto-Bold',
  },
  time: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 3,
    marginLeft: -3,
    marginRight: 25,
    fontFamily: 'Roboto-Italic',
  },
  resultButton: {
    backgroundColor: '#6D2C2A',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 15,
    borderColor: '#4F1A15',
    borderWidth: 3,
    marginBottom: 15,
    marginTop: 15,
    width: '95%',
  },
  resultButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-MediumItalic',
    lineHeight: 20,
  },
  customButton: {
    backgroundColor: '#F5E6E1',
    paddingVertical: 8,
    paddingHorizontal: 35,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#6D2C2A',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  }
});

export default TimerResults;