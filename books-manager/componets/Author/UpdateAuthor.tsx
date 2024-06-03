import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import GlobalContext from "../../helpers/Context";
import { IAuthor } from "../../helpers/IAuthor";
import { updateAuthor } from "../../helpers/api";


function UpdateAuthor({ navigation, route }: any) {
  const { authors, setAuthors } = useContext(GlobalContext);
  const [author, setAuthor] = useState<IAuthor>(route.params);

  const handleUpdateAuthor = async () => {
    try {
      const response = await updateAuthor(route.params.id, author);
      if (response) {
        const updatedAuthor: IAuthor = response;
        alert("Author updated successfully");
        const index = authors.findIndex((x) => x.id === route.params.id);
        if (index !== -1) {
          authors[index] = updatedAuthor;
          setAuthors([...authors]);
          navigation.goBack()
        } else {
          alert("Author not found in the local state");
        }
      } else {
        alert("Failed to update author");
      }
    } catch (error) {
      console.error("Error updating author:", error);
      alert("An error occurred while updating the author");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={author.name}
        onChangeText={(text) => setAuthor({ ...author, name: text })}
        placeholder="Enter author name"
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={author.phone}
        onChangeText={(text: string) => setAuthor({ ...author, phone: text })}
        placeholder="Enter author phone"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={author.email}
        onChangeText={(text: string) => setAuthor({ ...author, email: text })}
        placeholder="Enter author email"
      />
      <Button title="Update Author" onPress={handleUpdateAuthor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
});

export default UpdateAuthor;
