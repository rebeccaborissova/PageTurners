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

  const correctAlgorithm = sortTimes.timSort < sortTimes.radixSort ? "Tim Sort" : "Radix Sort"; // TODO: change placeholder to correct algorithm from CSV file data
  const userIsCorrect = sortingAlgo === correctAlgorithm;

  // initalizing state of next to be false (next will not appear)
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

    // after 5 seconds, showButton set to true
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return() => clearTimeout(timer);
  }, [fadeAnim, transYAnim]);

  const navigateToThankYou = () => {
    navigation.navigate('ThankYou');
  };

  return (
    <View style={styles.selection}>
      <Image source={images.logo} style={styles.logo} />

      <Animated.View style={[styles.contentContainer,{ opacity: fadeAnim, transform: [{ translateY: transYAnim }] },]}>

        <Text style={styles.title}>Sorting Algorithms</Text>

        {/* User Selected Sort */}
        <View style = {styles.selectedSortText}>
          <Text style={styles.subTitle}>Selected Sort </Text>
          <Text style={styles.selectedSort}>{sortingAlgo}</Text>
        </View>
        
        {/* Time Analysis */}
        <View style={styles.timeAnalysisContainer}>
          <Image source={images.clockIcon} style={styles.clockIcon} />
          <View style ={styles.timeAnalysisWords}>
            <Text style={styles.timeAnalysis}>Time Analysis</Text>
            <Text style={styles.time}>Radix Sort: {sortTimes.radixSort.toFixed(5)}s</Text>
            <Text style={styles.time}>Tim Sort: {sortTimes.timSort.toFixed(5)}s</Text>
          </View>
        </View>

        {/* results bubble */}
        <TouchableOpacity style={styles.resultButton} disabled>
          <Text style={styles.resultButtonText}>
            {userIsCorrect
              ? `Congratulations! ${correctAlgorithm} is the faster option.`
              : `Clearly ... ${correctAlgorithm} was the better option.`}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* next button */}
      {/* show button needs to be true for the following condition to be met */}
      {showButton && (
        <Animated.View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.customButton} onPress={navigateToThankYou}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  selection: {
    flex: 1,
    backgroundColor: '#F5E6E1',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: '#6D2C2A',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -20,
    marginBottom: 10,
    fontFamily: 'Roboto-BlackItalic',
  },
  subTitle: {
    color: '#000000',
    fontSize: 25,
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
  },
  selectedSortText: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  selectedSort: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'Roboto-Italic',
    marginBottom: 10,
  },

  // time analysis
  timeAnalysisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -20,
  },
  clockIcon: {
    width: 250,
    height: 250,
    marginLeft: -50,
  },
  timeAnalysisWords: {
    marginLeft: -40,
  },
  timeAnalysis: {
    fontSize: 25,
    color: '#000000',
    marginBottom: 5,
    marginLeft: -7,
    fontFamily: 'Roboto-Bold',
  },
  time: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
    marginLeft: -5,
    marginRight: 30,
    fontFamily: 'Roboto-Italic',
  },

  // results bubble
  resultButton: {
    backgroundColor: '#6D2C2A',
    paddingVertical: 40,
    paddingHorizontal: 50,
    borderRadius: 15,
    borderColor: '#4F1A15',
    borderWidth: 3,
    marginBottom: 20,
    marginTop: -50,
  },
  resultButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-MediumItalic',
    lineHeight: 21,
  },

  // next button
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: '#F5E6E1',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#6D2C2A',
    fontSize: 20,
    textAlign: 'center',
    marginTop: -8,
  }
});

export default TimerResults;
