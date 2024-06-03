import { View, Text, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import GlobalContext from "../../helpers/Context";
import { deletePublisher } from "../../helpers/api";
import { IPublisher } from "../../helpers/IPublisher";

interface PublisherProps {
  data: IPublisher;
  index: number;
}

const Publisher = ({ data, index }: PublisherProps) => {
  const { publishers, setPublishers } = useContext(GlobalContext);
  const navigation = useNavigation();

  const infoPressedEdit = () => {
    navigation.navigate("update-publisher", data);
  };

  const deletePublisherHandler = async () => {
    try {
      const response = await deletePublisher(data.id);
      if (response) {
        const updatedPublishers = publishers.filter(publisher => publisher.id !== data.id);
        setPublishers(updatedPublishers);
        Alert.alert("Success", "Publisher deleted successfully.");
      } else {
        Alert.alert("Error", "Failed to delete publisher.");
      }
    } catch (error) {
      console.error("Error deleting publisher:", error);
      Alert.alert("Error", "An error occurred while deleting the publisher.");
    }
  };

  const infoPressedDelete = () => {
    Alert.alert(
      "Confirmation",
      "Do you want to delete this publisher?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: deletePublisherHandler
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: index % 2 === 0 ? "#fff" : "#f7f7f9" }]}>
      <View style={styles.row}>
        <View style={styles.publisherDetails}>
          <Text style={styles.publisherName}>{data.name}</Text>
          <Text style={styles.publisherInfo}>
            Phone: {data.phone} - Email: {data.email} - Address: {data.address}
          </Text>
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
  publisherDetails: {
    flex: 8,
    flexDirection: "column",
  },
  publisherName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  publisherInfo: {
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

export default Publisher;
