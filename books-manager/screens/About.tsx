import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const About = () => {
  return (
    <ImageBackground source={require("../assets/pexels-karolina-grabowska-8947775.jpg")} style={styles.backgroundImage}>
      <View style={{ flex: 1, padding: 40 }}>
        <Text style={styles.header}>About Books</Text>
        <FontAwesome name="book" size={100} style={styles.icon} color="#0066CC" />
        <Text style={styles.text}>
          Welcome to the Books section! Here you can find a comprehensive collection of books from various genres and authors. Our library offers a wide range of titles to cater to your literary needs.
        </Text>
        <Text style={styles.text}>
          Explore our collection and discover new reads. Whether you're interested in fiction, non-fiction, educational, or technical books, we have something for everyone. Our goal is to provide a diverse selection to enhance your reading experience.
        </Text>
        <Text style={styles.text}>
          Our platform also allows you to manage your book collection efficiently. Add new books, manage authors and publishers, and keep track of your reading journey. Dive into the world of books and let your imagination soar!
        </Text>
      </View>
    </ImageBackground>

  );
};

export default About;

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  icon: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    fontWeight:'bold'
  },
});
