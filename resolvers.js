let books = [
    { id: '1', title: 'Doraemon', author: 'Tiến' },
  ];
  
  let currentId = 2;
  
  const resolvers = {
    Query: {
      books: () => books,
      book: (_, { id }) => books.find(b => b.id === id),
    },
    Mutation: {
      addBook: (_, { title, author }) => {
        const newBook = { id: String(currentId++), title, author };
        books.push(newBook);
        return newBook;
      },
      updateBook: (_, { id, title, author }) => {
        const index = books.findIndex(b => b.id === id);
        if (index === -1) throw new Error("Book not found");
        books[index] = { id, title, author };
        return books[index];
      },
      deleteBook: (_, { id }) => {
        books = books.filter(b => b.id !== id);
        return id;
      }
    }
  };
  
  module.exports = resolvers;
  