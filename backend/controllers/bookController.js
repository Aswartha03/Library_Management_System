const BookModel = require ('../models/bookModel');
const BorrowModel = require ('../models/borrowModel');

const UserModel = require ('../models/userModel');

let addBook = async (req, res) => {
  try {
    let {
      title,
      author,
      genre,
      publicationDate,
      description,
      coverImage,
    } = req.body;
    let newBook = await BookModel.create ({
      title,
      author,
      genre,
      publicationDate,
      description,
      coverImage,
    });
    // console.log (newBook);
    res.status (201).json ({message: 'Book added'});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};
let allBooks = async (req, res) => {
  try {
    let allBooks = await BookModel.find ();
    res.status (200).json ({message: allBooks});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};
// delete book by id
let deleteBookById = async (req, res) => {
  try {
    let userId = req.user;
    let bookId = req.params.id;
    let book = await BookModel.findById (bookId);
    if (!book) {
      return res.status (400).json ({message: 'Book is not Found'});
    }
    // deleting books in the borrowing books
    await BorrowModel.deleteMany ({bookId: bookId});
    let deletedBook = await BookModel.findByIdAndDelete (bookId);
    res.status (200).json ({message: 'Book is deleted', deletedBook});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

let updateBook = async (req, res) => {
  try {
    let bookId = req.params.id;
    let book = await BookModel.findById(bookId)
    let bookDetails = req.body;
    // console.log(bookDetails)
    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      { $set: bookDetails },
      { new: true, runValidators: true }
    );
    // console.log(updateBook)
    res.status (200).json ({message: 'Book Updated..', updatedBook});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

let getBookById = async (req, res) => {
  try {
    let bookId = req.params.id;
    let book = await BookModel.findById (bookId);
    if (!book) {
      res.status (404).json ({message: 'Book is not found'});
    }
    res.status (200).json ({message: 'Book Found', data: book});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};
module.exports = {addBook, allBooks, deleteBookById, updateBook, getBookById};
