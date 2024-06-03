import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, SafeAreaView, ScrollView, Platform, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const generateUniqueId = require('generate-unique-id');
import { updateCatalog, getCatalogs, getTransactions, addTransaction, updateTransaction } from '../../helpers/api';
import GlobalContext from '../../helpers/Context';
import { IBook } from '../../helpers/IBook';
import { IMember } from '../../helpers/IMember';
import ICatalog from '../../helpers/ICatalog';
import ITransaction from '../../helpers/ITransaction';
import { useNavigation } from '@react-navigation/native';

const Library = () => {
  const { books, members } = useContext(GlobalContext);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);
  const [catalogs, setCatalogs] = useState<ICatalog[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchCatalogs();
    fetchTransactions();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const catalogData = await getCatalogs();
      setCatalogs(catalogData);
    } catch (error) {
      console.error("Error fetching catalogs:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const transactionData = await getTransactions();
      setTransactions(transactionData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const getCatalogByBookId = async (bookId: string): Promise<ICatalog> => {
    return new Promise((resolve, reject) => {
      const catalog = catalogs.find(c => c.bookId === bookId);
      if (catalog) {
        resolve(catalog);
      } else {
        reject(new Error("Catalog not found for the given book ID"));
      }
    });
  };

  const borrowBook = async () => {
    if (!selectedBook || !selectedMember) {
      Alert.alert("Please select both a book and a member.");
      return;
    }

    try {
      const catalog: ICatalog = await getCatalogByBookId(selectedBook.id);
      if (!catalog) {
        Alert.alert("Selected book is not available.");
        return;
      }

      if (catalog.availableCopies === 0) {
        Alert.alert("No available copies of the selected book.");
        return;
      }

      const activeTransaction = transactions.find(
        (transaction) => transaction.bookId === selectedBook.id && transaction.memberId === selectedMember.id && !transaction.returnedDate
      );

      if (activeTransaction) {
        Alert.alert("You already borrowed this book.");
        return;
      }

      const updatedCatalog = { ...catalog, availableCopies: catalog.availableCopies - 1 };
      await updateCatalog(catalog.id, updatedCatalog);

      const newTransaction: ITransaction = {
        id: generateUniqueId(),
        bookId: selectedBook.id,
        memberId: selectedMember.id,
        borrowedDate: new Date().toISOString().split('T')[0],
        returnedDate: ""
      };
      await addTransaction(newTransaction);

      setTransactions([...transactions, newTransaction]);

      Alert.alert("Book borrowed successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error borrowing book:", error);
      Alert.alert("Error", "An error occurred while borrowing the book.");
    }
  };

  const returnBook = async () => {
    if (!selectedBook || !selectedMember) {
      Alert.alert("Please select both a book and a member.");
      return;
    }

    try {
      const activeTransaction = transactions.find(
        (transaction) => transaction.bookId === selectedBook.id && transaction.memberId === selectedMember.id && !transaction.returnedDate
      );

      if (!activeTransaction) {
        Alert.alert("You haven't borrowed this book.");
        return;
      }

      const catalog: ICatalog = await getCatalogByBookId(selectedBook.id);
      if (!catalog) {
        Alert.alert("Selected book is not available.");
        return;
      }

      const updatedCatalog = { ...catalog, availableCopies: catalog.availableCopies + 1 };
      await updateCatalog(catalog.id, updatedCatalog);

      const updatedTransaction = { ...activeTransaction, returnedDate: new Date().toISOString().split('T')[0] };
      await updateTransaction(activeTransaction.id, updatedTransaction);

      setTransactions(transactions.map((t) => t.id === activeTransaction.id ? updatedTransaction : t));

      Alert.alert("Book returned successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error returning book:", error);
      Alert.alert("Error", "An error occurred while returning the book.");
    }
  };

  return (
    <ImageBackground source={require("../../assets/pexels-freestocks-1122530.jpg")} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ flexDirection: "column" }}>
          <View style={[styles.pickerContainer, { marginBottom: 200 }]}>
            <Picker
              selectedValue={selectedBook ? selectedBook.id : null}
              style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => {
                const book = books.find((book) => book.id === itemValue);
                setSelectedBook(book || null);
              }}
            >
              <Picker.Item label="Select a book..." value={null} />
              {books.map((book) => (
                <Picker.Item key={book.id} label={book.title} value={book.id} />
              ))}
            </Picker>
          </View>
          <View style={[styles.pickerContainer, { marginBottom: 200 }]}>
            <Picker
              selectedValue={selectedMember ? selectedMember.id : null}
              style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => {
                const member = members.find((member) => member.id === itemValue);
                setSelectedMember(member || null);
              }}
            >
              <Picker.Item label="Select a member..." value={null} />
              {members.map((member) => (
                <Picker.Item key={member.id} label={member.email} value={member.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={borrowBook} style={[styles.button, styles.borrowButton]}>
              <Text style={styles.buttonText}>Borrow Book</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={returnBook} style={[styles.button, styles.returnButton]}>
              <Text style={styles.buttonText}>Return Book</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#800080"
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 200,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  borrowButton: {
    backgroundColor: '#4CAF50',
  },
  returnButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  }
});

export default Library;
