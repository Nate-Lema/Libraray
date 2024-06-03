import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import GlobalContext from "../../helpers/Context";
import { IAuthor } from "../../helpers/IAuthor";
import { addAuthor, getAuthors } from "../../helpers/api";

const generateUniqueId = require('generate-unique-id');

function AddAuthor({ navigation }: any) {
    const { authors, setAuthors } = useContext(GlobalContext);
    const [author, setAuthor] = useState<IAuthor>({
        id: generateUniqueId(),
        name: "",
        phone: "",
        email: "",
    });

    const handleAddAuthor = async () => {
        if (author.name.trim() === "" || author.phone.trim() === "" || author.email.trim() === "") {
            alert("Please fill in all fields");
            return;
        }
        try {
            const existingAuthors: IAuthor[] = await getAuthors();
            const isDuplicate = existingAuthors.some(existingAuthor => existingAuthor.email === author.email);
    
            if (isDuplicate) {
                alert("An author with the same email already exists");
                return;
            }
    
            const addedAuthor = await addAuthor(author);
            if (addedAuthor) {
                alert("Author added successfully");
                setAuthors([...authors, addedAuthor]);
                setAuthor({
                    id: generateUniqueId(),
                    name: "",
                    phone: "",
                    email: "",
                });
                navigation.goBack();
            } else {
                alert("Failed to add author");
            }
        } catch (error) {
            console.error("Error adding author:", error);
            alert("An error occurred while adding the author");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={author.name}
                    onChangeText={(text) => setAuthor({ ...author, name: text })}
                    placeholder="Enter author name"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={author.phone}
                    onChangeText={(text: string) => setAuthor({ ...author, phone: text })}
                    placeholder="Enter author phone"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={author.email}
                    onChangeText={(text: string) => setAuthor({ ...author, email: text })}
                    placeholder="Enter author email"
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddAuthor}>
                <Text style={styles.addButtonText}>Add Author</Text>
            </TouchableOpacity>
        </View>
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
        fontSize: 18,
        marginBottom: 5,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    addButton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AddAuthor;
