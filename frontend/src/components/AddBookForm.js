import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
    }
  }
`;

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      addBook({ variables: { title, author } });
      setTitle('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <input
        placeholder="Tác giả"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <button type="submit">Thêm</button>
    </form>
  );
}

export default AddBookForm;
