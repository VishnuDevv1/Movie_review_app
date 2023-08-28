import app from './server.js'
import dotenv from 'dotenv';
dotenv.config();
import mongodb from 'mongodb'
// import ReviewsDAO from './dao/reviewsDAO.js'
import { log } from 'console'
import mongoose from "mongoose"

const Mongo_Client = mongodb.MongoClient
const mongo_username = process.env['MONGO_UNAME']
const mongo_password = process.env['MONGO_PWD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.jxwyvcq.mongodb.net/?retryWrites=true&w=majority`

const port = 8000;

const start = async () => {
  try {await mongoose.connect(uri);
  app.listen(port, ()=>{
    console.log('listening on port 8000')})
       }
  catch(e) {
       console.log(e);
  }
}

start();