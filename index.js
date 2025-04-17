const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const sequelize = require('./db');
const Book = require('./models/Book');

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  // Kết nối và sync DB
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Đảm bảo table tồn tại
    console.log('✅ Kết nối MySQL thành công!');
  } catch (err) {
    console.error('❌ Kết nối MySQL thất bại:', err);
  }

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
