import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    coverImage: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:3000/book/update/${id}`, bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Book updated successfully!");
      navigate("/librarian-dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update book");
    }
  };

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const styles = {
    wrapper: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",
      padding: "20px",
      boxSizing: "border-box",
    },
    container: {
      width: "100%",
      maxWidth: "500px",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      fontSize: "1.8rem",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "15px",
      fontSize: "16px",
    },
    imagePreview: {
      display: "block",
      margin: "15px auto",
      maxWidth: "100%",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h3 style={styles.heading}>Update Book</h3>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            style={styles.input}
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <input
            style={styles.input}
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            placeholder="Genre"
          />
          <input
            style={styles.input}
            type="date"
            name="publicationDate"
            value={bookData.publicationDate?.slice(0, 10)}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="text"
            name="coverImage"
            value={bookData.coverImage}
            onChange={handleChange}
            placeholder="Cover Image URL"
          />
          {bookData.coverImage && (
            <img
              src={bookData.coverImage}
              alt="Book Cover"
              style={styles.imagePreview}
            />
          )}
          <button type="submit" style={styles.button}>
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
