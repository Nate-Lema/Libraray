import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import AddBook from '../componets/Book/AddBook';
import AddAuthor from '../componets/Author/AddAuthor';
import AddPublisher from '../componets/Publisher/AddPublisher';
import AddMember from '../componets/Member/AddMember';
import BooksList from '../componets/Book/BookList';
import AuthorsList from '../componets/Author/AuthorList';
import PublishersList from '../componets/Publisher/PublisherList';
import MembersList from '../componets/Member/MemberList';
import UpdateBook from '../componets/Book/UpdateBook';
import UpdateAuthor from '../componets/Author/UpdateAuthor';
import UpdatePublisher from '../componets/Publisher/UpdatePublisher';
import UpdateMember from '../componets/Member/UpdateMember';
import Library from '../componets/Library/Library';
import Admin from '../componets/Admin';

const { Navigator, Screen } = createStackNavigator();

const Home = () => {

  return (
    <Navigator>
      <Screen
        name="main"
        component={Main}
        options={{ title: "Home", headerShown: false }}
      />
       <Screen
        name="add-book"
        component={AddBook}
        options={{ title: "Add New Book" }}
      />
      <Screen
        name="add-author"
        component={AddAuthor}
        options={{ title: "Add New Author" }}
      /><Screen
        name="add-publisher"
        component={AddPublisher}
        options={{ title: "Add New Publisher" }}
      />
      <Screen
        name="add-member"
        component={AddMember}
        options={{ title: "Add New Member" }}
      />
      <Screen
        name="books-list"
        component={BooksList}
        options={{ title: "Book List" }}
      />
      <Screen
        name="authors-list"
        component={AuthorsList}
        options={{ title: "Authors List" }}
      /><Screen
        name="publishers-list"
        component={PublishersList}
        options={{ title: "Publishers List" }}
      /><Screen
        name="members-list"
        component={MembersList}
        options={{ title: "Members List" }}
      />
      <Screen
        name="update-book"
        component={UpdateBook}
        options={{ title: "Update Book" }}
      />
      <Screen
        name="update-author"
        component={UpdateAuthor}
        options={{ title: "Update Author" }}
      />
      <Screen
        name="update-publisher"
        component={UpdatePublisher}
        options={{ title: "Update Publisher" }}
      />
      <Screen
        name="update-member"
        component={UpdateMember}
        options={{ title: "Update Member" }}
      />
      <Screen
        name="library"
        component={Library}
        options={{ title: "My Library" }}
      />
      <Screen
        name="admin"
        component={Admin}
        options={{ title: "My Library" }}
      />
    </Navigator>
  );
};

export default Home