import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Admin = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require("../assets/pexels-karolina-grabowska-8947767.jpg")} style={styles.backgroundImage}>
      <SafeAreaView style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Welcome to Books Manager</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('add-book')}>
            <Text style={styles.buttonText}>Add Book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('add-author')}>
            <Text style={styles.buttonText}>Add Author</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('add-publisher')}>
            <Text style={styles.buttonText}>Add Publisher</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('add-member')}>
            <Text style={styles.buttonText}>Add Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('books-list')}>
            <Text style={styles.buttonText}>View Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('authors-list')}>
            <Text style={styles.buttonText}>View Authors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('publishers-list')}>
            <Text style={styles.buttonText}>View Publishers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('members-list')}>
            <Text style={styles.buttonText}>View Members</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#ff69b4',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#008000',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  features: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    width: '90%',
  },
  icon: {
    fontSize: 20,
    color: '#e74c3c',
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#34495e',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#3498db',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionLibrary: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#9acd32',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  }, 
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    marginTop:50

  }
});

export default Admin;
