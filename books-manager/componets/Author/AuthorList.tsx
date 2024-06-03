import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Platform, SafeAreaView, View, TouchableHighlight, Text } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../helpers/Context";
import Author from "./Author";

export default function AuthorsList() {
  const { authors } = useContext(GlobalContext);
  const [searchInput, setSearchInput] = useState("");
  const [displayAuthor, setDisplayAthor] = useState(authors);

  useEffect(() => {
    setDisplayAthor(authors)
  }, [authors]);

  const onSearch = (text: string) => {
    const arr = authors.filter((author) =>
      author.name.toLowerCase().startsWith(searchInput.trim().toLowerCase())
    );
    setDisplayAthor(arr);
    setSearchInput(text);
  };
  const navigation = useNavigation()
  const navigateToAddAuthor = () => {
    navigation.navigate("add-author")
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
      </View>
      <TouchableHighlight onPress={navigateToAddAuthor} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Author</Text>
      </TouchableHighlight>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search for Authors..."
          value={searchInput}
          onChangeText={onSearch}
        />
        <FlatList
          data={displayAuthor}
          renderItem={({ item, index }) => <Author data={item} index={index} />}
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
    paddingBottom: 200,
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
