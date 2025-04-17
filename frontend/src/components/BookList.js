import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const BookList = () => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: ['GetBooks'],
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: ['GetBooks'],
  });

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Có lỗi xảy ra</p>;

  const handleDelete = (id) => {
    deleteBook({ variables: { id } });
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
  };

  const handleUpdate = (id) => {
    updateBook({ variables: { id, title: editTitle, author: editAuthor } });
    setEditingId(null);
  };

  return (
    <ul>
      {data.books.map((book) => (
        <li key={book.id}>
          {editingId === book.id ? (
            <>
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} />
              <button onClick={() => handleUpdate(book.id)}>Lưu</button>
              <button onClick={() => setEditingId(null)}>Hủy</button>
            </>
          ) : (
            <>
              <strong>{book.title}</strong> – {book.author}{' '}
              <button onClick={() => handleEdit(book)}>Sửa</button>
              <button onClick={() => handleDelete(book.id)}>Xoá</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
