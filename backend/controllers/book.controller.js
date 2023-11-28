import express from 'express';
import asyncHandler from 'express-async-handler'

import Book from '../models/book.model.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const books = await Book.find({});
  
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const books = await Book.findById(req.params.id);
  
      return res.status(200).json({
        data: books
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

router.post('/',asyncHandler(async(req,res)=>{
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
          return res.status(400).send({ message:'All fields are mandatory!' })
        }
        const newBook = {
          title: req.body.title,
          author: req.body.author,
          publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
      } 
      catch (error) {
        res.status(500).send({ message: error.message }); 
      }
}))

router.put('/:id', async (req, res) => {
  try {

    const result = await Book.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;