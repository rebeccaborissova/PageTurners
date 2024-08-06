import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import images from '../constants/images';
import Footer from '../components/footer';

const TimerResults = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transYAnim = useRef(new Animated.Value(-70)).current;
  const route = useRoute();

  const { sortingAlgorithm } = route.params;
  console.log(sortingAlgorithm);

  const correctAlgorithm = 'Tim Sort'; // TODO: change placeholder to correct algorithm from CSV file data
  const userIsCorrect = sortingAlgorithm === correctAlgorithm;

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
  }, [fadeAnim, transYAnim]);

  const handleRestart = () => {
    navigation.navigate('ThankYou');
  };

  return (
    <View style={styles.selection}>
      <Image source={images.logo} style={styles.logo} />

      <Animated.View
        style={[
          styles.contentContainer,
          { opacity: fadeAnim, transform: [{ translateY: transYAnim }] },
        ]}
      >
        <Text style={styles.title}>Sorting Algorithms</Text>
        <Image source={images.line} style={styles.line} />
        <Text style={styles.subTitle}>Selected Sort:</Text>
        <Text style={styles.selectedSort}>{sortingAlgorithm}</Text>
        <Image source={images.line} style={styles.line} />

        <View style={styles.timeAnalysisContainer}>
          <Image source={images.clockIcon} style={styles.clockIcon} />
          <View>
            <Text style={styles.timeAnalysis}>Time Analysis</Text>
            <Text style={styles.time}>Quick Sort: 0.0000 seconds</Text>
            <Text style={styles.time}>Tim Sort: 0.0000 seconds</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.resultButton} disabled>
          <Text style={styles.resultButtonText}>
            {userIsCorrect
              ? `Congratulations! ${correctAlgorithm} is the faster option.`
              : `Clearly ... ${correctAlgorithm} was the better option.`}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.customButton} onPress={handleRestart}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
    fontFamily: 'Roboto-BlackItalic',
  },
  subTitle: {
    color: '#000000',
    fontSize: 25,
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
  },
  selectedSort: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'Roboto-Italic',
    marginBottom: 10,
  },
  line: {
    width: 500,
    height: 3,
    marginVertical: 15,
  },
  timeAnalysisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  clockIcon: {
    width: 200,
    height: 200,
    marginRight: -5,
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
  resultButton: {
    backgroundColor: '#6D2C2A',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 6,
    borderColor: '#4F1A15',
    borderWidth: 3,
    marginBottom: 20,
  },
  resultButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-MediumItalic',
  },
  buttonContainer: {
    marginTop: 15,
  },
  customButton: {
    backgroundColor: '#F5E6E1',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#6D2C2A',
    fontSize: 18,
    textAlign: 'center',
    marginTop: -8,
  }
});

export default TimerResults;
