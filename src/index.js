//importações necessárias para o projeto
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

//configurações para o servidor
app.use(bodyParser.json());
app.use(cors());

//Rotas
//criar item
app.post("/users", async (req, res) => {
  const data = req.body;
  await prisma.users.create({
    data: {
      name: data.name,
    },
  });
  return res.sendStatus(201);
});
//listar
app.get("/users", async (req, res) => {
  const users = await prisma.users.findMany();
  if (users.length > 0) return res.status(200).send(users);
  return res.send("No users found");
});
//procura

app.get("/users/:name", async (req, res) => {
  const name = req.params.name;
  const user = await prisma.users.findMany({
    where: {
      name: name,
    },
  });
  if (user.length > 0) return res.status(200).send(users);
  return res.send("No user found");
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
