// booksController.js

const express = require('express');
const router = express.Router();

// Require the book model
const Book = require('../models/book-model');

// routes will go here
router.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâ^€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

    //index route - GET
router.get('/', async (req, res) => {
    try{
        const books = await Book.find();

        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

    //individual book route - GET
router.get('/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);

        if(!book) {
            return res.status(404).json({ error: 'Book not Found!'});
        }
        // respond with idividual book - JSON
        res.json(book)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//update book route - PUT
router.put('/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;

    try {

        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, { new: true});

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found!'});
        }
        //respond with updated book as JSON
        res.json(updatedBook);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});

//delete book route - DELETE
router.delete('/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found!'});
        }

        res.json(deletedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Add book route - POST
router.post('/', async (req,res) => {
    const newBookData = req.body;

    try {
        const newBook = await Book.create(newBookData);

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// Export the router
module.exports = router;
