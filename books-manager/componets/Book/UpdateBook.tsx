import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import GlobalContext from "../../helpers/Context";
import { IBook } from "../../helpers/IBook";
import { getCatalogs, updateBook, updateCatalog } from "../../helpers/api";
import ICatalog from "../../helpers/ICatalog";

function UpdateBook({ navigation, route }: any) {
  const { books, setBooks } = useContext(GlobalContext);
  const [book, setBook] = useState<IBook>(route.params);
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [numberOfCopies, setNumberOfCopies] = useState<number>(0);
  const [availableCopies, setAvailableCopies] = useState<number>(0);

  const fetchCatalog = async () => {
    try {
      const catalogData: ICatalog[] = await getCatalogs();
      setCatalogs(catalogData);
    } catch (error) {
      console.error("Error fetching catalogs:", error);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    const catalogEntry = catalogs.find((catalog) => catalog.bookId === book.id);
    if (catalogEntry) {
      setNumberOfCopies(catalogEntry.numberOfCopies);
      setAvailableCopies(catalogEntry.availableCopies);
    }
  }, [catalogs, book.id]);

  const handleUpdateBook = async () => {
    try {
      const response = await updateBook(route.params.id, book);
      if (response) {
        const updatedBook: IBook = response;
        alert("Book updated successfully");
        const catalogEntry = catalogs.find((catalog) => catalog.bookId === updatedBook.id);
        if (catalogEntry) {
          const updatedCatalogEntry = {
            ...catalogEntry,
            numberOfCopies,
            availableCopies,
          };
          await updateCatalog(catalogEntry.id, updatedCatalogEntry);
        }
        const updatedBooks = books.map((b: IBook) => {
          if (b.id === updatedBook.id) {
            return updatedBook;
          } else {
            return b;
          }
        });
        setBooks(updatedBooks);

        navigation.goBack();
      } else {
        alert("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book");
    }
  };

  return (
    <View style={styles.container}>
      {/* Your existing input fields */}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
        placeholder="Enter book title"
      />
      <Text style={styles.label}>Genre:</Text>
      <TextInput
        style={styles.input}
        value={book.genre}
        onChangeText={(text: string) => setBook({ ...book, genre: text })}
        placeholder="Enter genre"
      />
      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        value={book.category}
        onChangeText={(text: string) => setBook({ ...book, category: text })}
        placeholder="Enter category"
      />
      <Text style={styles.label}>AuthorIds:</Text>
      <TextInput
        style={styles.input}
        value={book.authorIDs.join(", ")}
        onChangeText={(text: string) => setBook({ ...book, authorIDs: text.split(", ") })}
        placeholder="Enter author IDs separated by comma"
      />
      <Text style={styles.label}>PublisherId:</Text>
      <TextInput
        style={styles.input}
        value={book.publisherId}
        onChangeText={(text: string) => setBook({ ...book, publisherId: text })}
        placeholder="Enter publisher ID"
      />
      {/* Your existing input fields */}
      <Text style={styles.label}>Number of Copies:</Text>
      <TextInput
        style={styles.input}
        value={numberOfCopies.toString()}
        onChangeText={(text) => setNumberOfCopies(parseInt(text))}
        keyboardType="numeric"
        placeholder="Enter number of copies"
      />
      <Text style={styles.label}>Available Copies:</Text>
      <TextInput
        style={styles.input}
        value={availableCopies.toString()}
        onChangeText={(text) => setAvailableCopies(parseInt(text))}
        keyboardType="numeric"
        placeholder="Enter available copies"
      />
      <Button title="Update Book" onPress={handleUpdateBook} />
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
  },
});

export default UpdateBook;
