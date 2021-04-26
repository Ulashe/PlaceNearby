import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

export function PlaceDetail() {
  const route = useRoute();
  const [place, setPlace] = useState(null);
  console.log(place);
  useEffect(() => {
    axios
      .get(
        `https://petmore.herokuapp.com/place-details?placeId=ChIJwaEkm_RByxQRcBFOptsziCs`,
        {
          headers: {
            Authorization: 'anonymous123',
          },
        },
      )
      .then(res => setPlace(res.data.response.placeDetails))
      .catch(error => console.log(error));
  }, []);

  if (place) {
    return (
      <ScrollView style={styles.container}>
        <Text>İsim: {place.placeName}</Text>
        <Text>Telefon numarası: {place.placePhoneNumber}</Text>
        <Text>Adres: {place.Addr}</Text>
        <Text>Phone number: {place.placePhoneNumber}</Text>
        <Text>Yorumlar</Text>
        <View>
          {place.reviews.map(review => (
            <View key={review.date}>
              <Text>İsim: {review.name}</Text>
              <Text>Yorum: {review.text}</Text>
              <Text>Dil: {review.language}</Text>
              <Text>Tarih: {new Date(Number(review.date)).toDateString()}</Text>
              <Text>Puan: {review.rating}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
