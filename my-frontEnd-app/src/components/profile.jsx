import React, { useEffect, useState } from "react";
import "../CSS/Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found. Please log in.");
          return;
        }
        const res = await fetch("http://localhost:3000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          alert("Unauthorized. Please login again.");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data.profile);
        setBooks(data.books);
      } catch (err) {
        console.error("Error:", err.message);
        alert("Something went wrong. Try again later.");
      }
    }
    fetchProfile();
  }, [books]);

  const handleReturn = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }
      const res = await fetch(`http://localhost:3000/borrow/return/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to return book");
      // setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      alert("Book returned successfully!");
    } catch (err) {
      console.error("Return error:", err.message);
      alert("Something went wrong while returning the book.");
    }
  };
  return (
    <div className="profile-container">
      {/* Go to Dashboard Button */}
      <Link to="/dashboard" className="dashboard-btn">
        Go to Dashboard
      </Link>

      {user ? (
        <div className="profile-layout">
          {/* Left: User Details */}
          <div className="profile-card">
            <h2 className="profile-heading">{user.name}'s Profile</h2>
            <div className="profile-info">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Contact:</strong> {user.contact || "Not Provided"}
              </p>
              <Link to="/edit-profile" className="edit-btn">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Right: Borrowed Books */}
          <div className="borrowed-books-card">
            <h3>Borrowed Books</h3>
            {books?.length > 0 ? (
              <ul className="book-list">
                {books.map((book, idx) => (
                  <li className="book-card" key={idx}>
                    <div className="book-title">Title: {book.title}</div>
                    <div className="book-meta">
                      Due Date: {new Date(book.dueDate).toLocaleDateString()}
                    </div>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="book-cover"
                    />
                    <button
                      className="return-btn"
                      onClick={() => handleReturn(book._id)}
                    >
                      Return Book
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-books">No borrowed books.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="loader">Loading profile...</div>
      )}
    </div>
  );
}

export default Profile;
