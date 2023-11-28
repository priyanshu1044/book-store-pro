//dependency import 
import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors';
//local imports 
import connectDb from './db.js'
import bookRoutes from './controllers/book.controller.js'

//app
const app=express();

//constant
const dotENV=dotenv.config()
const port=5000 || process.env.PORT

//middleware
app.use(bodyParser.json())
// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: ['https://book-store-pro.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);
app.get('/', (request, response) => {
    response.json("hello")
  });

app.use('/api/books',bookRoutes)

connectDb()
    .then(()=>{
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`)
        })
    })
    .catch(err=>console.log(err))

