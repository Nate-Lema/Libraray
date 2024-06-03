import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, View, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { isEligibleUser } from "../helpers/api";
import LOCAL_STORAGE_KEY from "../helpers/constants";

interface LoginProps {
    setLoggedIn: (loggedIn: boolean) => void;
}

const Login = ({ setLoggedIn }: LoginProps) => {
    const [email, setEmail] = useState("");

    const onLogin = async () => {
        try {
            if (email.trim() === "") {
                return Alert.alert("Please enter an email");
            }
            const response = await isEligibleUser(email);
            if (response) {
                AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ loggedIn: true }));
                setLoggedIn(true);
            } else {
                Alert.alert("Invalid Email");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <ImageBackground source={require("../assets/pexels-mark-cruzat-1872272-3494806.jpg")} style={styles.backgroundImage}>
            <SafeAreaView style={[styles.container]}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Welcome to log in</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onLogin}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    formContainer: {
        width: "100%",
        maxWidth: 300,
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        marginTop:60,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: "#fff"
    },
    button: {
        backgroundColor: "#007bff",
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Login;

