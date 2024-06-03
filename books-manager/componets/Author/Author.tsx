import { View, Text, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import GlobalContext from "../../helpers/Context";
import { IAuthor } from "../../helpers/IAuthor";
import { deleteAuthor } from "../../helpers/api";

interface AuthorProps {
  data: IAuthor;
  index: number;
}

const Author = ({ data, index }: AuthorProps) => {
  const { authors, setAuthors } = useContext(GlobalContext);
  const navigation = useNavigation();

  const infoPressedEdit = () => {
    navigation.navigate("update-author", data);
  };

  const deleteAuthorHandler = async () => {
    try {
      const response = await deleteAuthor(data.id);
      if (response) {
        const updatedAuthors = authors.filter(author => author.id !== data.id);
        setAuthors(updatedAuthors);
        Alert.alert("Success", "Author deleted successfully.");
      } else {
        Alert.alert("Error", "Failed to delete author.");
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      Alert.alert("Error", "An error occurred while deleting the author.");
    }
  };

  const infoPressedDelete = () => {
    Alert.alert(
      "Confirmation",
      "Do you want to delete this author?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: deleteAuthorHandler,
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: index % 2 === 0 ? "#fff" : "#f7f7f9" }]}>
      <View style={styles.row}>
        <View style={styles.course}>
          <Text style={styles.authorName}>{data.name}</Text>
          <Text style={styles.authorDetails}>{data.phone} - {data.email}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableHighlight
            onPress={infoPressedEdit}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={infoPressedDelete}
            style={[styles.button, styles.deleteButton]}
            underlayColor="#e74c3c"
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  course: {
    flex: 8,
    flexDirection: "column",
  },
  authorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  authorDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actions: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    marginLeft:8,
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 14,
    textAlign: "center",
  },
  deleteButton: {
    borderColor: "#e74c3c",
    backgroundColor: "#fff",
  },
});

export default Author;
