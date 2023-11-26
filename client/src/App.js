import React from 'react';
import BookLibrary from './BookLibrary';
import Book from './Book';
import Header from './Header';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (

    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BookLibrary />}>
          </Route>
          <Route path="/create" element={<Book />} >
          </Route>
          <Route path="/edit/:id" element={<Book />} >
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
