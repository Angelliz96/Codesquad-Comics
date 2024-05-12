const express = require('express');
const router = express.Router();
const{getAllBooks, getBook, createBook, editBook,deleteBook} = require('../controllers/bookController')
//3. Moving routes into a new home, Part 2

router.get('/', getAllBooks);
  router.get("/:id", getBook);  
  router.post("/create", createBook);
  router.put("/edit/:id", editBook);
  router.delete("/delete/:id", deleteBook)


module.exports = router;