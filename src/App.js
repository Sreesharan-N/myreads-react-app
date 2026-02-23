import "./App.css";
import { useEffect, useState, useCallback } from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const data = await BooksAPI.getAll();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchAllBooks();
  }, []);

  const updateShelf = useCallback(async (book, shelf) => {
    await BooksAPI.update(book, shelf);

    setBooks((prevBooks) => {
      const exists = prevBooks.find((b) => b.id === book.id);

      if (exists) {
        if (shelf === "none") {
          return prevBooks.filter((b) => b.id !== book.id);
        }

        return prevBooks.map((b) => (b.id === book.id ? { ...b, shelf } : b));
      }

      return [...prevBooks, { ...book, shelf }];
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage books={books} updateShelf={updateShelf} />}
      />
      <Route
        path="/search"
        element={<SearchPage books={books} updateShelf={updateShelf} />}
      />
    </Routes>
  );
}

export default App;
