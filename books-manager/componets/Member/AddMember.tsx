import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import GlobalContext from "../../helpers/Context";
import { addMember, getMembers } from "../../helpers/api";
import { IMember } from "../../helpers/IMember";

const generateUniqueId = require('generate-unique-id');

function AddMember({ navigation }: any) {
    const { members, setMembers } = useContext(GlobalContext);
    const [member, setMember] = useState<IMember>({
        id: generateUniqueId(),
        residentID: "",
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        email: ""
    });

    const handleAddMember = async () => {
        if (
            member.residentID.trim() === "" ||
            member.firstname.trim() === "" ||
            member.lastname.trim() === "" ||
            member.address.trim() === "" ||
            member.phone.trim() === "" ||
            member.email.trim() === ""
        ) {
            alert("Please fill in all fields");
            return;
        }
    
        try {
            const existingMembers: IMember[] = await getMembers();
            const isDuplicate = existingMembers.some(existingMember => existingMember.email === member.email);
    
            if (isDuplicate) {
                alert("A member with the same email already exists");
                return;
            }
    
            const addedMember = await addMember(member);
            if (addedMember) {
                alert("Member added successfully");
                setMembers([...members, addedMember]);
                setMember({
                    id: generateUniqueId(),
                    residentID: "",
                    firstname: "",
                    lastname: "",
                    address: "",
                    phone: "",
                    email: ""
                });
                navigation.goBack();
            } else {
                alert("Failed to add member");
            }
        } catch (error) {
            console.error("Error adding member:", error);
            alert("An error occurred while adding the member");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={member.residentID}
                    onChangeText={(text) => setMember({ ...member, residentID: text })}
                    placeholder="Enter member resident ID"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={member.firstname}
                    onChangeText={(text: string) => setMember({ ...member, firstname: text })}
                    placeholder="Enter member first name"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={member.lastname}
                    onChangeText={(text: string) => setMember({ ...member, lastname: text })}
                    placeholder="Enter member last name"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={member.address}
                    onChangeText={(text: string) => setMember({ ...member, address: text })}
                    placeholder="Enter member address"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={member.phone}
                    onChangeText={(text: string) => setMember({ ...member, phone: text })}
                    placeholder="Enter member phone"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={member.email}
                    onChangeText={(text: string) => setMember({ ...member, email: text })}
                    placeholder="Enter member email"
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
                <Text style={styles.addButtonText}>Add Member</Text>
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

export default AddMember;
