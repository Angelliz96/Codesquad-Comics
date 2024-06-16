const Books = require("../models/bookModel");
const siteData = require("../data/data-1")


const getAllBooks = async (request, response, next) => {
  await Books.find({}).then((books) =>
  response.status(200).json({
    success: { message: "This route points to the Books page with all of the books" },
    data: books,
    statusCode: 200,
  })
  )
};

const getBook = async (request, response, next) => {
  const { id } = request.params; 

  try {
    const foundBook = await Books.findById(id);
    if (!foundBook) {
      return response.status(404).json({
        error: { message: "Book not found" },
        statusCode: 404
      });
    }
    response.status(200).json({
      success: { message: "Found the book!!"},
      data: foundBook,
      statusCode: 200,
    });
  } catch (err) {
    response.status(500).json({
      error: { message: "Something went wrong retrieving a book!" },
      statusCode: 500
    });
  }
}

const createBook = async (request, response, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis } =
    request.body;

  const newBook = new Comics({
    title: title,
    author: author,
    publisher: publisher,
    genre: genre,
    pages: pages,
    rating: rating,
    synopsis: synopsis,
  });

  try {
    await newBook.save();
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

const editBook = async (request, response, next) => {
  const { id } = request.params;
  const { title, author, publisher, genre, pages, rating, synopsis } =
    request.body;

  try {
    const updatedBook = await Comics.findByIdAndUpdate(id, {
      title,
      author,
      publisher,
      genre,
      pages,
      rating,
      synopsis,
    }, { new: true });

    if (!updatedBook) {
      return response.status(404).json({
        error: { message: "Book not found" },
        statusCode: 404
      });
    }

    response.status(200).json({
      success: { message: "Book is updated" },
      data: updatedBook,
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Something went wrong while editing the book" },
      statusCode: 400,
    });
  }
};

const deleteBook = async (request, response, next) => {
  const { id } = request.params;

  try {
    const deletedBook = await Books.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({
        error: { message: "Book not found" },
        statusCode: 404
      });
    }

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
