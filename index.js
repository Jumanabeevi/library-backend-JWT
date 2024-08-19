const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample data
let books = [
    { id: 1, title: '1984', authorId: 1 },
    { id: 2, title: 'To Kill a Mockingbird', authorId: 2 },
];

let authors = [
    { id: 1, name: 'George Orwell' },
    { id: 2, name: 'Harper Lee' },
];

// CRUD for Books
app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        authorId: req.body.authorId,
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.title = req.body.title;
        book.authorId = req.body.authorId;
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Book not found');
    }
});

// CRUD for Authors
app.get('/authors', (req, res) => {
    res.json(authors);
});

app.get('/authors/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);
    if (author) {
        res.json(author);
    } else {
        res.status(404).send('Author not found');
    }
});

app.post('/authors', (req, res) => {
    const newAuthor = {
        id: authors.length + 1,
        name: req.body.name,
    };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

app.put('/authors/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);
    if (author) {
        author.name = req.body.name;
        res.json(author);
    } else {
        res.status(404).send('Author not found');
    }
});

app.delete('/authors/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const authorIndex = authors.findIndex(a => a.id === authorId);
    if (authorIndex !== -1) {
        authors.splice(authorIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Author not found');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
