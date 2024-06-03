import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IBook } from "../../helpers/IBook";
import GlobalContext from "../../helpers/Context";
import { deleteBook, getAuthors, getCatalogs, getPublishers, updateBook } from "../../helpers/api";
import { Picker } from '@react-native-picker/picker';
import ICatalog from "../../helpers/ICatalog";

interface BookProps {
  data: IBook;
  index: number;
}

const Book = ({ data }: BookProps) => {
  const { books, setBooks, authors, setAuthors, publishers, setPublishers } = useContext(GlobalContext);
  const [catalogs, setCatalogs] = useState<ICatalog[]>([])
  const navigation = useNavigation();

  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(data.authorIDs || []);
  const [selectedPublisher, setSelectedPublisher] = useState<string>(data.publisherId);
  const [currentAuthor, setCurrentAuthor] = useState<string>("");
  const [numberOfCopies, setNumberOfCopies] = useState<number>(0);
  const [availableCopies, setAvailableCopies] = useState<number>(0);

  useEffect(() => {
    fetchAuthors();
    fetchPublishers();
    fetchCatalog();
  }, []);

  const fetchAuthors = async () => {
    try {
      const authorsData = await getAuthors();
      setAuthors(authorsData);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchPublishers = async () => {
    try {
      const publishersData = await getPublishers();
      setPublishers(publishersData);
    } catch (error) {
      console.error("Error fetching publishers:", error);
    }
  };
  const fetchCatalog = async () => {
    try {
      const catalogData: ICatalog[] = await getCatalogs();
      setCatalogs(catalogData);
      const bookCatalog = catalogData.find(catalog => catalog.bookId === data.id);
      if (bookCatalog) {
        setNumberOfCopies(bookCatalog.numberOfCopies);
        setAvailableCopies(bookCatalog.availableCopies);
      }
    } catch (error) {
      console.error("Error fetching catalogs:", error);
    }
  };

  const infoPressedEdit = () => {
    navigation.navigate("update-book", data);
  };

  const deleteBookHandler = async () => {
    try {
      const response = await deleteBook(data.id);
      if (response) {
        const updatedBooks = books.filter(book => book.id !== data.id);
        setBooks(updatedBooks);
      } else {
        Alert.alert("Error", "Failed to delete book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "An error occurred while deleting the book.");
    }
  };

  const infoPressedDelete = () => {
    Alert.alert(
      "Confirmation",
      "Do you want to delete this book?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: deleteBookHandler,
        },
      ],
    );
  };

  const addAuthorToBook = async (authorId: string) => {
    try {
      const updatedAuthors = [...new Set([...selectedAuthors, authorId])];
      setSelectedAuthors(updatedAuthors);
      setCurrentAuthor(authorId);
      const updatedBook = { ...data, authorIDs: updatedAuthors };
      await updateBook(data.id, updatedBook);
      setBooks(books.map(book => (book.id === data.id ? updatedBook : book)));
    } catch (error) {
      console.error("Error updating book:", error);
      Alert.alert("Error", "An error occurred while adding author(s) to the book.");
    }
  };

  const addPublisherToBook = async (publisherId: string) => {
    try {
      setSelectedPublisher(publisherId);
      const updatedBook = { ...data, publisherId };
      await updateBook(data.id, updatedBook);
      setBooks(books.map(book => (book.id === data.id ? updatedBook : book)));
    } catch (error) {
      console.error("Error updating book:", error);
      Alert.alert("Error", "An error occurred while adding the publisher to the book.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={Platform.OS === 'ios' ? false : true}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.genreContainer}>
            <Text style={styles.boldLabel}>Genre:</Text>
            <Text style={styles.genreValue}>{data.genre} </Text>
          </View>
          <View style={styles.catagoryContainer}>
            <Text style={styles.boldLabel}>- Category:</Text>
            <Text style={styles.catagoryValue}>{data.category}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.catalogContainer}>
            <Text style={styles.boldLabel}>Number of Copies:</Text>
            <Text style={styles.catalogValue}>{numberOfCopies} </Text>
          </View>
          <View style={styles.catalogContainer}>
            <Text style={styles.boldLabel}>- Available Copies:</Text>
            <Text style={styles.catalogValue}>{availableCopies}</Text>
          </View>
        </View>
        <View style={styles.publisherContainer}>
          <Text style={styles.boldLabel}>Publisher
            :</Text>
          <Text style={styles.publisherValue}>{publishers.find(publisher => publisher.id === data.publisherId)?.name}</Text>
        </View>
        <View style={styles.authorsContainer}>
          <Text style={styles.label}>Authors:</Text>
          <View style={styles.authors}>
            {selectedAuthors.map((authorId, index) => (
              <Text key={authorId} style={styles.authorName}>
                {index !== 0 && ", "}
                {authors.find(author => author.id === authorId)?.name}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <View style={[styles.pickerContainer, { marginBottom: 130 }]}>
          <Text style={[styles.label, { marginLeft: 50 }]}>Authors:</Text>
          <Picker
            selectedValue={currentAuthor}
            style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => {
              setCurrentAuthor(itemValue);
              addAuthorToBook(itemValue);
            }}
          >
            {authors.map(author => (
              <Picker.Item key={author.id} label={author.name} value={author.id} />
            ))}
          </Picker>
        </View>
        <View style={[styles.pickerContainer, { marginBottom: 130 }]}>
          <Text style={[styles.label, { marginLeft: 50 }]}>Publisher:</Text>
          <Picker

            selectedValue={selectedPublisher}
            style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => addPublisherToBook(itemValue)}
          >
            {publishers.map(publisher => (
              <Picker.Item key={publisher.id} label={publisher.name} value={publisher.id} />
            ))}
          </Picker>
        </View>
        <View style={{ flexDirection: "column", gap: 20 }}>
          <TouchableOpacity
            onPress={infoPressedEdit}
            style={[styles.button, styles.editButton]}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={infoPressedDelete}
            style={[styles.button, styles.deleteButton]}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#F9F9F9",
    marginBottom: 20
  },
  infoContainer: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerContainer: {
    flex: 1,
    marginRight: 2,
  },
  label: {
    fontSize: 12,
    marginBottom: 3,
    color: "#333333",
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  pickerIOS: {
    height: 0,
    shadowColor: 'transparent',
  },
  pickerItem: {
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 20,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#FF5722",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  authorsContainer: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  authors: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 5,
  },
  authorName: {
    fontSize: 12,
    color: "#333333",
    marginRight: 5,
  },
  boldLabel: {
    fontSize: 12,
    color: "#333333",
    fontWeight: "bold",
  },
  publisherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  publisherValue: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 5,
  },
  genreValue: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 5,
  },
  catagoryValue: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 5,
  },
  catalogContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  genreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  catagoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  catalogValue: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 5,
  },
});

export default Book;
