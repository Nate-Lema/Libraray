import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Features = () => {
  return (
    <SafeAreaView style={styles.features}>
      <View style={styles.feature}>
        <FontAwesome5 name="book" style={styles.icon} />
        <Text style={styles.featureText}>Add new books with detailed information</Text>
      </View>
      <View style={styles.feature}>
        <FontAwesome5 name="user-plus" style={styles.icon} />
        <Text style={styles.featureText}>Manage authors and their details</Text>
      </View>
      <View style={styles.feature}>
        <FontAwesome5 name="list-alt" style={styles.icon} />
        <Text style={styles.featureText}>View and search your book inventory</Text>
      </View>
      <View style={styles.feature}>
        <FontAwesome5 name="users" style={styles.icon} />
        <Text style={styles.featureText}>Discover new authors and their works</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  features: { 
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
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
    fontSize: 12,
    color: '#34495e',
  },
});

export default Features;