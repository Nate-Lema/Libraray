import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import GlobalContext from "../../helpers/Context";
import { IPublisher } from "../../helpers/IPublisher";
import { updatePublisher } from "../../helpers/api";


function UpdatePublisher({ navigation, route }: any) {
  const { publishers, setPublishers } = useContext(GlobalContext);
  const [publisher, setPublisher] = useState<IPublisher>(route.params);

  const handleUpdatePublisher = async () => {
    try {
      const response = await updatePublisher(route.params.id, publisher);
      if (response) {
        const updatedPublisher: IPublisher = response;
        alert("Publisher updated successfully");
        const index = publishers.findIndex((x) => x.id === route.params.id);
        if (index !== -1) {
          publishers[index] = updatedPublisher;
          setPublishers([...publishers]);
          navigation.goBack()
        } else {
          alert("Publisher not found in the local state");
        }
      } else {
        alert("Failed to update publisher");
      }
    } catch (error) {
      console.error("Error updating publisher:", error);
      alert("An error occurred while updating the publisher");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={publisher.name}
        onChangeText={(text) => setPublisher({ ...publisher, name: text })}
        placeholder="Enter publisher name"
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={publisher.phone}
        onChangeText={(text: string) => setPublisher({ ...publisher, phone: text })}
        placeholder="Enter publisher phone"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={publisher.email}
        onChangeText={(text: string) => setPublisher({ ...publisher, email: text })}
        placeholder="Enter publisher email"
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={publisher.address}
        onChangeText={(text: string) => setPublisher({ ...publisher, address: text })}
        placeholder="Enter publisher address"
      />
      <Button title="Update Publisher" onPress={handleUpdatePublisher} />
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

export default UpdatePublisher;
