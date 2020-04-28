const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

const db = mongoose.connect('mongodb://localhost:27017/bookAPI', {useNewUrlParser: true});

const Book = require('./bookModel');

const port = process.env.PORT || 4000;

const bookRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter.route('/books').post(
  (req,res)=>{
    const body = req.body;
    const book = new Book(body);
    book.save();
    console.log(book);
    return res.status(201).json(book);

  }
)

bookRouter.route('/books')
.get((req,res) => {
  //const query = {"genre": "Fantasy"};
  //const {query} = req;
  console.log("req",req.query);
  const response = Book.find((err,data)=>{
    //console.log('data',data);
    if(err){
      return res.send(err)
    }
     return res.json(data);
  });
});

bookRouter.route('/books/:bookId')
.get((req,res) => {
  //const query = {"genre": "Fantasy"};
  //const {query} = req;
  console.log("req",req.query);
  const response = Book.findById(req.params.bookId,(err,data)=>{
    //console.log('data',data);
    if(err){
      return res.send(err)
    }
     return res.json(data);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log('App started on port 4000');
});
