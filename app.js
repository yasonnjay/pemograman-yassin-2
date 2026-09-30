const express = require("express");
const cors = require("cors");
const app = express();

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

// Sesuaikan folder 'jenis kelamin' yang menggunakan spasi
const typeDefs = require("./graphql/jenis kelamin/schema");
const jenisKelaminResolvers = require("./graphql/jenis kelamin/resolvers");

const resolvers = [
  jenisKelaminResolvers
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startGraphQL() {
  await server.start();
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server)
  );
}

startGraphQL();

app.use(cors());
app.use(express.json());
console.log("Port dari .env:", process.env.PORT);

app.get("/", (req, res) => {
  res.json({
    message: "API Mahasiswa Berjalan Dan Sukses",
    port: process.env.PORT
  });
});

module.exports = app;