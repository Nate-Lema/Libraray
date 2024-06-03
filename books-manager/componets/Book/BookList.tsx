import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Platform, SafeAreaView, View, TouchableHighlight, Text } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../helpers/Context";
import Book from "./Book";

export default function BooksList() {
  const { books} = useContext(GlobalContext);
  const [searchInput, setSearchInput] = useState("");
  const [displayCourse, setDisplayCourse] = useState(books);

  useEffect(() => {
    setDisplayCourse(books)
  }, [books]);

  const onSearch = (text: string) => {
    const arr = books.filter((book) =>
      book.title.toLowerCase().includes(searchInput.trim().toLowerCase())
    );
    setDisplayCourse(arr);
    setSearchInput(text);
  };
  const navigation = useNavigation()
 
  return (
    <SafeAreaView style={styles.container}>
      <View>
      </View>
      <TouchableHighlight onPress={()=>navigation.navigate("add-book")} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Book</Text>
      </TouchableHighlight>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search for Books..."
          value={searchInput}
          onChangeText={onSearch}
        />
        <FlatList
          data={displayCourse}
          renderItem={({ item, index }) => <Book data={item} index={index} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingBottom: 10,
    marginBottom:120
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
