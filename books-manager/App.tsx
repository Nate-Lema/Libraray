import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GlobalContext from "./helpers/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LOCAL_STORAGE_KEY from "./helpers/constants";
import About from "./screens/About";
import { IBook } from "./helpers/IBook";
import { IAuthor } from "./helpers/IAuthor";
import { IPublisher } from "./helpers/IPublisher";
import { IMember } from "./helpers/IMember";
import { getAuthors, getBooks, getMembers, getPublishers } from "./helpers/api";
import Home from "./screens/Home";
import Login from "./componets/Login";


const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    loadBooks()
    loadAuthors()
    loadPublishers()
    loadMembers()
  }, [])

  async function loadBooks() {
    try {
      setLoading(true)
      const data = await AsyncStorage.getItem(LOCAL_STORAGE_KEY)
      if (data) {
        const obj = JSON.parse(data)
        setLoggedIn(obj.loggedIn)
      }
      const books = await getBooks();
      setBooks(books);
    } catch (error) {
      console.log(error);
    }
      setLoading(false)
  }

  async function loadAuthors() {
    try {
      const authors = await getAuthors();
      setAuthors(authors);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadPublishers() {
    try {
      const publishers = await getPublishers();
      setPublishers(publishers);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMembers() {
    try {
      const members = await getMembers();
      setMembers(members);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    )
  }

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />
  }

  return (
    <GlobalContext.Provider value={{
      books,
      setBooks,
      authors,
      setAuthors,
      publishers,
      setPublishers,
      members,
      setMembers,
      setLoggedIn
    }}>
      <NavigationContainer>
        <Navigator
          initialRouteName="home"
          screenOptions={{ headerShown: false }}
        >
          <Screen
            name="home"
            component={Home}
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={25} />
              ),
            }}
          />
          <Screen
            name="about"
            component={About}
            options={{
              title: "About",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={25}
                />
              ),
            }}
          />
        </Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
