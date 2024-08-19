const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db'); // Import your MongoDB connection function

// Import Mongoose models
const Book = require('./models/Book');
const Author = require('./models/Author');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware to handle JSON data
app.use(express.json());

// CRUD for Books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find().populate('authorId');
    res.json(books);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('authorId');
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/books', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      authorId: req.body.authorId,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).send('Bad request');
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        authorId: req.body.authorId,
      },
      { new: true }
    );
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    res.status(400).send('Bad request');
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      res.status(204).send();
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// CRUD for Authors
app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).send('Author not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/authors', async (req, res) => {
  try {
    const newAuthor = new Author({
      name: req.body.name,
    });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).send('Bad request');
  }
});

app.put('/authors/:id', async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (updatedAuthor) {
      res.json(updatedAuthor);
    } else {
      res.status(404).send('Author not found');
    }
  } catch (error) {
    res.status(400).send('Bad request');
  }
});

app.delete('/authors/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (deletedAuthor) {
      res.status(204).send();
    } else {
      res.status(404).send('Author not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
