import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LibrarianDashboard() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://library-management-system-i0c3.onrender.com/book/allBooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBooks(data.message);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`https://library-management-system-i0c3.onrender.com/book/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📚 Librarian Dashboard</h2>
        <Link to="/add-book" style={styles.addBtn}>
          ➕ Add Book
        </Link>
      </div>

      <div style={styles.grid}>
        {books.length > 0 &&
          books.map((book) => (
            <div key={book._id} style={styles.card}>
              <h3 style={styles.bookTitle}>{book.title}</h3>
              <img
                src={
                  book.coverImage ||
                  "https://via.placeholder.com/300x250?text=No+Image"
                }
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x250?text=Image+Unavailable";
                }}
                alt={book.title}
                style={styles.bookImage}
              />
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Status:</strong> {book.status}
              </p>
              <p>
                <strong>Published:</strong>{" "}
                {new Date(book.publicationDate).toDateString()}
              </p>
              <div style={styles.actions}>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
                <Link to={`/edit-book/${book._id}`} style={styles.updateBtn}>
                  Update
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingTop: "80px", 
    padding: "30px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "32px",
    color: "#2c3e50",
    margin: 0,
  },
  addBtn: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    color: "#333",
  },
  bookTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#34495e",
    marginBottom: "12px",
  },
  bookImage: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    marginBottom: "16px",
    border: "1px solid #ddd",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  updateBtn: {
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "8px 14px",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "14px",
  },
};

export default LibrarianDashboard;
