let express = require ('express');
const { addBook, allBooks, deleteBookById, updateBook, getBookById } = require('../controllers/bookController');
const roleCheckMiddleware = require('../middlewares/roleCheckMiddleware');

let bookRouter = express.Router ();

// add book , only librarian can add 
bookRouter.post("/add-book",roleCheckMiddleware("librarian"),addBook)
// get all books
bookRouter.get("/allbooks",allBooks)
// delete book by id 
bookRouter.delete("/delete/:id",roleCheckMiddleware("librarian"),deleteBookById)
// update boom by id 
bookRouter.put("/update/:id",roleCheckMiddleware("librarian"),updateBook)
// get book by id 
bookRouter.get("/:id",roleCheckMiddleware("librarian"),getBookById)






module.exports = bookRouter;
