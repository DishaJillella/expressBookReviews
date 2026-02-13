const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    let userExists = users.filter((user) => user.username === username);
    if (userExists.length > 0) {
      return res.status(404).json({message: "User already exists!"});
    } else {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    }
  }
  return res.status(404).json({message: "Unable to register user. Username and/or password not provided."});
});

// Task 10: Get the book list available in the shop using async-await
public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve, reject) => {
      resolve(books);
    });
    const allBooks = await getBooks;
    return res.status(200).send(JSON.stringify(allBooks, null, 4));
  } catch (error) {
    return res.status(500).json({message: "Error fetching books"});
  }
});

// Task 11: Get book details based on ISBN using Promise callbacks
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBookByIsbn = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });

  getBookByIsbn
    .then((book) => res.status(200).send(book))
    .catch((err) => res.status(404).json({message: err}));
});
  
// Task 12: Get book details based on author using async-await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  const getBooksByAuthor = new Promise((resolve, reject) => {
    let matchingBooks = [];
    let keys = Object.keys(books);
    for (let i = 0; i < keys.length; i++) {
      if (books[keys[i]].author === author) {
        matchingBooks.push(books[keys[i]]);
      }
    }
    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject("No books found by this author");
    }
  });

  try {
    const result = await getBooksByAuthor;
    return res.status(200).send(result);
  } catch (error) {
    return res.status(404).json({message: error});
  }
});

// Task 13: Get all books based on title using async-await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  const getBooksByTitle = new Promise((resolve, reject) => {
    let matchingBooks = [];
    let keys = Object.keys(books);
    for (let i = 0; i < keys.length; i++) {
      if (books[keys[i]].title === title) {
        matchingBooks.push(books[keys[i]]);
      }
    }
    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject("No books found with this title");
    }
  });

  try {
    const result = await getBooksByTitle;
    return res.status(200).send(result);
  } catch (error) {
    return res.status(404).json({message: error});
  }
});

// Task 5: Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
      res.send(books[isbn].reviews);
  } else {
      res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;