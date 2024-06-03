import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import GlobalContext from "../../helpers/Context";
import { addPublisher, getPublishers } from "../../helpers/api";
import { IPublisher } from "../../helpers/IPublisher";
const generateUniqueId = require('generate-unique-id');

function AddPublisher({ navigation }: any) {
    const { publishers, setPublishers } = useContext(GlobalContext);
    const [publisher, setPublisher] = useState<IPublisher>({
        id: generateUniqueId(),
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const handleAddPublisher = async () => {
        if (
            publisher.name.trim() === "" ||
            publisher.phone.trim() === "" ||
            publisher.email.trim() === "" ||
            publisher.address.trim() === ""
        ) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const existingPublishers: IPublisher[] = await getPublishers();
            const isDuplicate = existingPublishers.some(existingPublisher => existingPublisher.name === publisher.name);

            if (isDuplicate) {
                alert("A publisher with the same name already exists");
                return;
            }

            const addedPublisher = await addPublisher(publisher);
            if (addedPublisher) {
                alert("Publisher added successfully");
                setPublishers([...publishers, addedPublisher]);
                setPublisher({
                    id: generateUniqueId(),
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                });
                navigation.goBack();
            } else {
                alert("Failed to add publisher");
            }
        } catch (error) {
            console.error("Error adding publisher:", error);
            alert("An error occurred while adding the publisher");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={publisher.name}
                    onChangeText={(text) => setPublisher({ ...publisher, name: text })}
                    placeholder="Enter publisher name"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={publisher.phone}
                    onChangeText={(text: string) => setPublisher({ ...publisher, phone: text })}
                    placeholder="Enter publisher phone"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={publisher.email}
                    onChangeText={(text: string) => setPublisher({ ...publisher, email: text })}
                    placeholder="Enter publisher email"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={publisher.address}
                    onChangeText={(text: string) => setPublisher({ ...publisher, address: text })}
                    placeholder="Enter publisher address"
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddPublisher}>
                <Text style={styles.addButtonText}>Add Publisher</Text>
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

export default AddPublisher;
