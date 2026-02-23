import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";

import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";

function App() {
  const [books,setBooks] = useState([]);

  useEffect(()=>{
    const fetchAllBooks=async ()=>{
      try{
        const books = await BooksAPI.getAll();
        setBooks(books);
      }
      catch(error){
        console.error("Error in fetching the books details : ",error);
      }
    }

    fetchAllBooks();
  },[]);

  const updateShelf=async (book,shelf)=>{
    await BooksAPI.update(book,shelf);

    setBooks((prevBooks)=>{
      const existing = prevBooks.find((b)=>b.id===book.id);

      if(existing){
        return prevBooks.map((b)=>
        b.id===book.id?{...b,shelf}:b
      );
      }
      else{
        return [...prevBooks,{...book,shelf}];
      }
    });
  };

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
