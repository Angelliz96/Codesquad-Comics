const express = require('express');
const router = express.Router();
const{getAllBooks, getBook, createBook, editBook,deleteBook} = require('../controllers/bookController')
//3. Moving routes into a new home, Part 2
router.get('/', getAllBooks)
// router.get("/", (request, response, next) => {
//     // response.send("This route points to the Api page")
//     response
//       .status(200)
//       .json({ success: { message: "send all of the book data" } });
//   });
  router.get("/:id", getBook);
 
  
  router.post("/create", createBook);

  router.put("/edit/:id", editBook);

  router.delete("/delete/:id", deleteBook)


module.exports = router;