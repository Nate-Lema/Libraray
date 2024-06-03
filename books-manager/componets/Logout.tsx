import React, { useContext } from "react";
import { SafeAreaView, Text, TouchableHighlight, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LOCAL_STORAGE_KEY from "../helpers/constants";
import GlobalContext from "../helpers/Context";


const Logout = () => {
    const {setLoggedIn} = useContext(GlobalContext)
    const onLogOut = async () => {
        try {
            await AsyncStorage.removeItem(LOCAL_STORAGE_KEY);
            setLoggedIn(false);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#5398DC"
                onPress={onLogOut}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#0066CC",
        borderRadius: 5,
        padding: 15,
        width: "20%",
        alignItems: "center",
        marginBottom:18
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
});

export default Logout;
