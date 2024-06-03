import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import GlobalContext from "../../helpers/Context";
import { IMember } from "../../helpers/IMember";
import { updateMember } from "../../helpers/api";



function UpdateMember({ navigation, route }: any) {
  const { members, setMembers } = useContext(GlobalContext);
  const [member, setMember] = useState<IMember>(route.params);

  const handleUpdateMember = async () => {
    try {
      const response = await updateMember(route.params.id, member);
      if (response) {
        const updatedMember: IMember = response;
        alert("Member updated successfully");
        const index = members.findIndex((x) => x.id === route.params.id);
        if (index !== -1) {
          members[index] = updatedMember;
          setMembers([...members]);
          navigation.goBack()
        } else {
          alert("Course not found in the local state");
        }
      } else {
        alert("Failed to update member");
      }
    } catch (error) {
      console.error("Error updating member:", error);
      alert("An error occurred while updating the member");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={member.residentID}
        onChangeText={(text) => setMember({ ...member, residentID: text })}
        placeholder="Enter member ResidentID"
      />
      <Text style={styles.label}>Firstname:</Text>
      <TextInput
        style={styles.input}
        value={member.firstname}
        onChangeText={(text: string) => setMember({ ...member, firstname: text })}
        placeholder="Enter member Firstname"
      />
      <TextInput
        style={styles.input}
        value={member.lastname}
        onChangeText={(text: string) => setMember({ ...member, lastname: text })}
        placeholder="Enter member lastname"
      />
      <TextInput
        style={styles.input}
        value={member.address}
        onChangeText={(text: string) => setMember({ ...member, address: text })}
        placeholder="Enter member address"
      />
      <TextInput
        style={styles.input}
        value={member.phone}
        onChangeText={(text: string) => setMember({ ...member, phone: text })}
        placeholder="Enter member phone"
      />
      <TextInput
        style={styles.input}
        value={member.email}
        onChangeText={(text: string) => setMember({ ...member, email: text })}
        placeholder="Enter member email"
      />
      <Button title="Update Member" onPress={handleUpdateMember} />
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

export default UpdateMember;
