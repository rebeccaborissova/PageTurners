// SortingAlgoChoice.js
/*import React, { useState, useCallback, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Platform } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { cards } from '../components/cards';

const SortingAlgoChoice = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Added state for search term
  const [error, setError] = useState(false); // Added state for error
  const searchRef = useRef(null);

  const getSuggestions = useCallback((q) => {
    const filterToken = q.toLowerCase();
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    const suggestions = cards
      .filter((item) => item.title.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.title,
        title: item.title,
      }));
    setSuggestionsList(suggestions);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const searchBook = () => {
    if (selectedItem) {
      navigation.navigate('Swiping', { bookName: selectedItem.title, sortingAlgorithm: 'TimSort' });
    } else {
      setError(true); // Set error to true if no book is selected
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input a Book & Sorting Algorithm</Text>
      <View style={styles.autocompleteContainer}>
        <AutocompleteDropdown
          ref={searchRef}
          dataSet={suggestionsList}
          onChangeText={(text) => {
            getSuggestions(text);
            setSearchTerm(text); // Update search term
          }}
          onSelectItem={(item) => {
            setSelectedItem(item);
          }}
          debounce={300}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          textInputProps={{
            placeholder: 'Enter a book title...',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: styles.input,
          }}
          inputContainerStyle={styles.inputContainer}
          suggestionsListContainerStyle={styles.suggestionsContainer}
          containerStyle={styles.dropdownContainer}
        />
      </View>
      <Button title="Search" onPress={searchBook} />
      {error && searchTerm !== '' && <Text style={styles.errorText}>Sorry, this book is not available in the PageTurner dataset.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  autocompleteContainer: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    borderRadius: 25,
    backgroundColor: '#fff', 
    color: '#000', 
    paddingLeft: 18,
    borderWidth: 1, 
    borderColor: '#383b42', 
  },
  inputContainer: {
    backgroundColor: '#fff', 
    borderRadius: 25,
    borderWidth: 1, 
    borderColor: '#383b42', 
  },
  suggestionsContainer: {
    backgroundColor: '#383b42',
  },
  dropdownContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default SortingAlgoChoice;

*/
// SortingAlgoChoice.js
/*import React, { useState, useCallback, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { cards } from '../components/cards';

const SortingAlgoChoice = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const searchRef = useRef(null);

  const getSuggestions = useCallback((q) => {
    const filterToken = q.toLowerCase();
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList([]);
      return;
    }
    const suggestions = cards
      .filter((item) => item.title.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.title,
        title: item.title,
      }));
    setSuggestionsList(suggestions);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList([]);
    setSearchTerm('');
  }, []);

  const searchBook = () => {
    if (selectedItem) {
      navigation.navigate('Swiping', { bookName: selectedItem.title, sortingAlgorithm: 'TimSort' });
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input a Book & Sorting Algorithm</Text>
      <View style={styles.autocompleteContainer}>
        <AutocompleteDropdown
          ref={searchRef}
          dataSet={suggestionsList}
          onChangeText={(text) => {
            getSuggestions(text);
            setSearchTerm(text);
            setError(false);
          }}
          onSelectItem={(item) => {
            setSelectedItem(item);
          }}
          debounce={300}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          textInputProps={{
            placeholder: 'Enter a book title...',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: styles.input,
          }}
          inputContainerStyle={styles.inputContainer}
          suggestionsListContainerStyle={styles.suggestionsContainer}
          containerStyle={styles.dropdownContainer}
        />
      </View>
      <Button title="Search" onPress={searchBook} />
      {error && searchTerm !== '' && (
        <Text style={styles.errorText}>Sorry, this book is not available in the PageTurner dataset.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  autocompleteContainer: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    borderRadius: 25,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 18,
    borderWidth: 1,
    borderColor: '#383b42',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#383b42',
  },
  suggestionsContainer: {
    backgroundColor: '#383b42',
  },
  dropdownContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default SortingAlgoChoice;*/

/*import React, { useState, useCallback, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { cards } from '../components/cards';

const SortingAlgoChoice = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const searchRef = useRef(null);

  const getSuggestions = useCallback((q) => {
    const filterToken = q.toLowerCase();
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList([]);
      return;
    }
    const suggestions = cards
      .filter((item) => item.title.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.title,
        title: item.title,
      }));
    setSuggestionsList(suggestions);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList([]);
    setSearchTerm('');
  }, []);

  const searchBook = () => {
    if (selectedItem) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleSortSelection = (algorithm) => {
    navigation.navigate('Swiping', { bookName: selectedItem.title, sortingAlgorithm: algorithm });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a Book Title</Text>
      <View style={styles.autocompleteContainer}>
        <AutocompleteDropdown
          ref={searchRef}
          dataSet={suggestionsList}
          onChangeText={(text) => {
            getSuggestions(text);
            setSearchTerm(text);
            setError(false);
          }}
          onSelectItem={(item) => {
            setSelectedItem(item);
          }}
          debounce={300}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          textInputProps={{
            placeholder: 'Type at least 3 characters..',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: styles.input,
          }}
          inputContainerStyle={styles.inputContainer}
          suggestionsListContainerStyle={styles.suggestionsContainer}
          containerStyle={styles.dropdownContainer}
        />
      </View>
      <Button title="Search" onPress={searchBook} />
      {error && searchTerm !== '' && (
        <Text style={styles.errorText}>Sorry, this book is not available in the PageTurner dataset.</Text>
      )}
      {!error && selectedItem && (
        <View style={styles.sortOptionsContainer}>
          <Text style={styles.successText}>{selectedItem.title} found! Please select a sorting algorithm to provide you with similar book recommendations:</Text>
          <View style={styles.buttonContainer}>
            <Button title="Tim Sort" onPress={() => handleSortSelection('TimSort')} />
            <Button title="Quick Sort" onPress={() => handleSortSelection('QuickSort')} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  autocompleteContainer: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    borderRadius: 25,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 18,
    borderWidth: 1,
    borderColor: '#fff',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#383b42',
  },
  suggestionsContainer: {
    backgroundColor: '#383b42',
  },
  dropdownContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  successText: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  sortOptionsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },
});

export default SortingAlgoChoice;*/

// SortingAlgoChoice.js - the one currently correct in GitHub
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SortingAlgoChoice = ({ navigation }) => {
  const [bookName, setBookName] = useState('');

  const searchBook = () => {
    // Placeholder for search logic
    console.log('Search for:', bookName);
    navigation.navigate('Swiping', { bookName, sortingAlgorithm: 'TimSort' }); // Example navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a book title</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={setBookName}
        value={bookName}
      />
      <Button title="Search" onPress={searchBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SortingAlgoChoice;
