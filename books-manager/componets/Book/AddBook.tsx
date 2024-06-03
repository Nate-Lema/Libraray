import React, { useContext, useState, useEffect } from "react";
import { Text, TextInput, StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import GlobalContext from "../../helpers/Context";
import { IBook } from "../../helpers/IBook";
import { addBook, getBooks, getAuthors, getPublishers, addCatalog } from "../../helpers/api";
const generateUniqueId = require('generate-unique-id');
import { Picker } from '@react-native-picker/picker';

function AddBook({ navigation }: any) {
  const { setBooks, authors, publishers, setAuthors, setPublishers } = useContext(GlobalContext);
  const [book, setBook] = useState<IBook>({
    id: generateUniqueId(),
    title: "",
    genre: "",
    category: "",
    authorIDs: [],
    publisherId: "",
  });
  const [numberOfCopies, setNumberOfCopies] = useState<number>(1);
  const [availableCopies, setAvailableCopies] = useState<number>(1);

  useEffect(() => {
    fetchAuthors();
    fetchPublishers();
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
const handleAuthorChange = (itemValue:string) => {
  setBook(prevBook => ({
    ...prevBook,
    authorIDs: [itemValue],
  }));
};

  const handleAddBook = async () => {
    if (book.title.trim() === "" || book.genre.trim() === "" || book.category.trim() === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      const existingBooks: IBook[] = await getBooks();
      const isDuplicate = existingBooks.some(existingBook => existingBook.title === book.title);
      if (isDuplicate) {
        alert("A book with the same title already exists");
        return;
      }
      const addedBook = await addBook(book);
      if (addedBook) {
        alert("Book added successfully");

        const catalogEntry = {
          id: generateUniqueId(),
          bookId: addedBook.id,
          numberOfCopies: numberOfCopies,
          availableCopies: availableCopies,
        };
        await addCatalog(catalogEntry);

        setBooks([...existingBooks, addedBook]);
        setBook({
          id: generateUniqueId(),
          title: "",
          genre: "",
          category: "",
          authorIDs: [],
          publisherId: "",
        });
        setNumberOfCopies(0);
        setAvailableCopies(0);
        navigation.goBack();
      } else {
        alert("Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred while adding the book");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={book.title}
          onChangeText={(text) => setBook({ ...book, title: text })}
          placeholder="Enter book title"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={book.genre}
          onChangeText={(text) => setBook({ ...book, genre: text })}
          placeholder="Enter book genre"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={book.category}
          onChangeText={(text) => setBook({ ...book, category: text })}
          placeholder="Enter book category"
        />
      </View>
      <View style={[styles.inputContainer,{marginBottom:120}]}>
          <Text style={styles.label}>Authors:</Text>
          <Picker
            selectedValue={book.authorIDs[0]}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={handleAuthorChange}
          >
            {authors.map(author => (
              <Picker.Item key={author.id} label={author.name} value={author.id} />
            ))}
          </Picker>
        </View>
      <View style={[styles.inputContainer,{marginBottom:120}]}>
        <Text style={styles.label}>Publisher:</Text>
        <Picker
          selectedValue={book.publisherId}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue) => setBook({ ...book, publisherId: itemValue })}
        >
          {publishers.map(publisher => (
            <Picker.Item key={publisher.id}  label={publisher.name} value={publisher.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={numberOfCopies.toString()}
          onChangeText={(text) => setNumberOfCopies(parseInt(text))}
          placeholder="Enter number of copies"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={availableCopies.toString()}
          onChangeText={(text) => setAvailableCopies(parseInt(text))}
          placeholder="Enter available copies"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
        <Text style={styles.addButtonText}>Add Book</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  pickerItem: {
    fontSize: 12,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddBook;

