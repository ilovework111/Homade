import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const prisma = new PrismaClient();

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}

app.post('/signup', async (req, res) => {
  const { name, surname, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = {
    name: capitalize(name),
    surname: capitalize(surname),
    email,
    password: hashedPassword,
  };

  try {
    var user = await prisma.user.create({
      data: newUser
    });
    res.status(201).send()
  } catch (error) {
    if (user === undefined){
      res.status(409).send()
    } else {
      res.status(500).send()
      console.log(error)
    }
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  var user = null;
  try {
    let user = await prisma.user.findUnique({
      where: { email: email }
    });
    const result = await bcrypt.compare(password, user.password);
    console.log(result);
    if (result){
      res.status(200).send();
    } else {
      res.status(403).send();
    }
    console.log(user); 
  } catch (error) {
    if (user === null){
      res.status(404).send();
    } else {
      res.status(500).send();
      console.log(error);
    }
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
