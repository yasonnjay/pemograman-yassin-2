const express = require("express");
const cors = require("cors");
const app = express();

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

// Sesuaikan folder 'jenis kelamin' yang menggunakan spasi
const typeDefsJenisKelamin = require("./graphql/jenis kelamin/schema");
const jenisKelaminResolvers = require("./graphql/jenis kelamin/resolvers");

const typeDefsAngkatan = require("./graphql/angkatan/schema");
const angkatanResolvers = require("./graphql/angkatan/resolvers");

const typeDefsMahasiswa = require("./graphql/mahasiswa/schema");
const mahasiswaResolvers = require("./graphql/mahasiswa/resolvers");

const typeDefsProgramStudi = require("./graphql/program_studi/schema");
const programStudiResolvers = require("./graphql/program_studi/resolvers");

const resolvers = [
  jenisKelaminResolvers,
  angkatanResolvers,
  mahasiswaResolvers,
  programStudiResolvers
];

const server = new ApolloServer({
  typeDefs: [
    typeDefsJenisKelamin,
    typeDefsAngkatan,
    typeDefsMahasiswa,
    typeDefsProgramStudi
  ],
  resolvers
});


app.use(cors());
app.use(express.json());

async function startGraphQL() {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server)
  );
}

startGraphQL();

console.log("Port dari .env:", process.env.PORT);

app.get("/", (req, res) => {
  res.json({
    message: "API Mahasiswa Berjalan Dan Sukses",
    port: process.env.PORT
  });
});

module.exports = app;