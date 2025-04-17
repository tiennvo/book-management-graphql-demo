import React from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>📚 Danh sách sách</h1>
      <h2>➕ Thêm sách mới</h2>
      <AddBookForm />
      <hr />
      <BookList />
    </div>
  );
}

export default App;
