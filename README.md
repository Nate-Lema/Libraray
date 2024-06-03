# React Native Library Management App

This project is a React Native application for managing a library. It utilizes `json-server` for the backend and implements CRUD operations for authors, publishers, books, and members. Additionally, it includes features for searching books by title and managing book borrowing and returning. User authentication with email-based login and persistent sessions is also implemented.

## Features

1. **CRUD Authors**
   - **Create Author**: Form to input author details with duplicate check.
   - **Read Authors**: Display a list of authors with detailed view.
   - **Update Author**: Edit author details.
   - **Delete Author**: Remove an author with confirmation.

2. **CRUD Publishers**
   - Similar to CRUD Authors.

3. **CRUD Books**
   - **Create Book**: Form to add a book including title, genre, category, and selection of authors and publishers.
   - **Read Books**: List or grid view of books with filtering options.
   - **Update Book**: Modify book details.
   - **Delete Book**: Remove a book with confirmation.

4. **CRUD Members**
   - Similar to CRUD operations for authors and publishers, with unique ID validation.

5. **Search Book by Title**
   - Implement a search bar to filter books based on the title.

6. **Borrow a Book**
   - Select a book and a member, confirm the borrowing transaction, and decrease the available copies of the book.

7. **Return a Book**
   - Similar to borrowing, but increase the available copies of the book upon return.

8. **User Authentication**
   - **Login Screen**: Sign in with email, grant access if the email exists in the database.
   - **Persistent Login**: Keep users logged in when they reopen the app.
   - **Logout**: Function to log out users.

## Technical Requirements

1. **Navigation**: Utilize `react-navigation` to structure the application.
2. **State Management**: Use context to share data as needed.
3. **Picker Component**: Use Expo's Picker component for dropdown lists.
4. **Styling**: Ensure a responsive and aesthetically pleasing layout using CSS and Flexbox.
5. **Error Handling and Validation**: Implement necessary error handlers and validations.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nate-Lema/Libraray
   cd Libraray
2. **Install dependencies**:
   npm install
   npm install -g json-server
   json-server --watch db.json --port port #
3 **Install dependencies**:
   npm start



