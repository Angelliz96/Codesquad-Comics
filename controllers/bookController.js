// const { request, response } = require("express");

// const booksData = require("../data/data-1");
const Book = require("../models/bookModel");

// first part getting all the books
const getAllBooks = async (request, response, next) => {
  try {
    await Book.find({}).then((books) => {
      response.status(200).json({ data: books });
    });
  } catch (error) {
    next(error);
  }
};

// getting a specific book

const getBook = async (request, response, next) => {
  const { id } = request.params;
  try {
    await Book.findOne({ _id: id }).then((foundBook) => {
      res.status(200).json({ data: foundBook });
    });
  } catch (error) {
    next(error);
  }
};

//create a book

const createBook = async (request, response, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis } =
    request.body; // parameters including in the new object

  const newBook = {
    title: title,
    author: author,
    publisher: publisher,
    genre: genre,
    pages: pages,
    rating: rating,
    synopsis: synopsis,
  };

  // await newBook.save();
  booksData.push(newBook);

  try {
    response.status(201).json({
      success: {
        message: "A new book is created",
        data: newBook,
        statusCode: 201,
      },
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Something went wrong creating a book!" },
      statusCode: 400,
    });
  }
};

//EDIT BOOK
const editBook = async (request, response, next) => {
  const { id } = request.params;
  const { title, author, publisher, genre, pages, rating, synopsis } =
    request.body;

  try {
    // await booksData.findByIdAndUpdate(
    //   {id},
    //   {
    //     $set: {
    //       title,
    //       author,
    //       publisher,
    //       genre,
    //       pages,
    //       rating,
    //       synopsis,
    //     },
    //   },
    //   { new: true }
    // );

    const findBook = booksData.find((book) => book.id === Number(id));
    console.log(findBook);
    findBook.title = title;
    response.status(201).json({
      success: {
        message: "Book is updated",
      },
      data: findBook,
      statusCode: 201,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Something went wrong while editing the book" },
      statusCode: 400,
    });
  }
};

//DELETE BOOKS

const deleteBook = async (request, response, next) => {
  const { id } = request.params;

  try {
    // await booksData.findByIdAndDelete({ id });
    const filterBooks = booksData.filter((book) => book.id != id);
    console.log(filterBooks);
    response.status(200).json({
      success: "Book deleted successfully!",
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: "Something went wrong while deleting the book!",
      statusCode: 400,
    });
  }
};

module.exports = { getAllBooks, getBook, createBook, editBook, deleteBook };
