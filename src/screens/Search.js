import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/core';

export function Search() {
  const navigation = useNavigation();

  const [nearest, setNearest] = useState(true);
  const [bestRated, setBestRated] = useState(true);
  const [crntOpen, setCrntOpen] = useState(true);
  const [hasPhRw, setHasPhRw] = useState(true);
  const [search, setSearch] = useState();

  return (
    <View style={styles.main}>
      <View style={styles.contianer}>
        <Text style={styles.title}>Search Criterias</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            value={nearest}
            onValueChange={b => setNearest(b)}
          />
          <Text onPress={() => setNearest(state => !state)}>
            Nearest Places
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox value={bestRated} onValueChange={b => setBestRated(b)} />
          <Text onPress={() => setBestRated(state => !state)}>
            Best Rated Places
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox value={crntOpen} onValueChange={b => setCrntOpen(b)} />
          <Text onPress={() => setCrntOpen(state => !state)}>
            Currently Open Places
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox value={hasPhRw} onValueChange={b => setHasPhRw(b)} />
          <Text onPress={() => setHasPhRw(state => !state)}>
            Has Photos and Reviews
          </Text>
        </View>
        <TextInput
          placeholder="Search nearest veterinarians..."
          value={search}
          onChangeText={t => setSearch(t)}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Results', {
              nearest,
              bestRated,
              crntOpen,
              hasPhRw,
              search,
            })
          }>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contianer: {
    width: '80%',
    height: '60%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: 'white',
    borderRadius: 25,
    backgroundColor: 'cadetblue',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {},
  textInput: {
    borderColor: 'grey',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 25,
  },
  button: {
    height: 60,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cadetblue',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
  },
});
