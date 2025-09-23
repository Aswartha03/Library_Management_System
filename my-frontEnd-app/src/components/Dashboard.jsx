import React, { useEffect, useState } from "react";
import "../CSS/Dashboard.css";
function DashBoard() {
  const [books, setBooks] = useState([]);
  const [searchGenre, setSearchGenre] = useState("");
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://library-management-system-i0c3.onrender.com/book/allBooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // https://library-management-system-i0c3.onrender.com
      const data = await response.json();
      setBooks(data.message || data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = (() => {
    const matches = books.filter((book) =>
      book.genre?.toLowerCase().includes(searchGenre.toLowerCase())
    );
    return matches.length > 0 ? matches : books;
  })();

  const handleBorrow = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/borrow/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      alert(result.message || "Book borrowed successfully!");
      console.log(result.data);
      fetchBooks();
    } catch (error) {
      alert("Failed to borrow book");
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 style={{ color: "black" }}>Welcome to Your Dashboard</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search by Genre..."
          value={searchGenre}
          onChange={(e) => setSearchGenre(e.target.value)}
        />
      </div>

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div key={book._id} className="book-card">
            <img src={book.coverImage} alt={book.title} />
            <h4 style={{ color: "black" }}>Title : {book.title}</h4>
            <p style={{ color: "black" }}>
              <strong>Author:</strong> {book.author}
            </p>
            <p style={{ color: "black" }}>
              <strong>Genre:</strong> {book.genre}
            </p>
            <button
              onClick={()=>handleBorrow(book._id)}
              className="borrow-btn"
              disabled={book.status === "borrowed"}
            >
              Borrow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashBoard;
