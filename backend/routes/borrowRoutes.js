let express = require ('express');
const roleCheckMiddleware = require ('../middlewares/roleCheckMiddleware');
const BorrowModel = require ('../models/borrowModel');
const BookModel = require('../models/bookModel');
let borrowRouter = express.Router ();

// borrow book
borrowRouter.post ('/:id', roleCheckMiddleware ('user'), async (req, res) => {
  try {
    let userId = req.user;
    let bookId = req.params.id;
    let book = await BookModel.findById (bookId);
    if (!book) {
      return res.status (404).json ({message: 'Book not found'});
    }
    if (book.status === 'borrowed') {
      return res.status (400).json ({message: 'Book is already borrowed'});
    }
    book.status = 'borrowed';
    await book.save ();
    const dueDate = new Date ();
    dueDate.setDate (dueDate.getDate () + 7);
    let newBorrowedBook = await BorrowModel.create ({userId, bookId, dueDate});
    res
      .status (200)
      .json ({message: 'Book is Borrowed', data: newBorrowedBook});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});

borrowRouter.delete("/return/:bookId",roleCheckMiddleware("user"),async(req,res)=>{
  try {
    let bookId = req.params.bookId 
    // console.log(bookId)
    let book = await BookModel.findById(bookId)
    book.status = "available" ; 
    await BorrowModel.deleteMany({bookId})
    await book.save()
    res.status(200).json({message:"Book Returned"})
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
})
module.exports = borrowRouter;
