const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

//Stuff you did already and copy pasted later 
// app.use(express.urlencoded({ extended: true }))
// //express  doesn’t handle reading data from the <form> element on it’s own

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
//   // do something here
// })

// app.post('/quotes', (req, res) => {
//   console.log('Hellooooooooooooooooo!')
//   console.log(req.body)
// })

app.set('view engine', 'ejs')

let connectionString = 'mongodb+srv://cevangdpt:Money123!@cluster0.ievoq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // do something here
})  

MongoClient.connect(connectionString).then(
  client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs') //place first
    app.use(express.urlencoded({ extended: true }))
    app.get('/', (req, res) => {
      db.collection('quotes')
        .find()
        .toArray()
        .then(results => {   
          res.render('index.ejs', { quotes: results })       
        })
        .catch(error => console.error(error))
      res.render('index.ejs', {})
      // do something here
    })    
    app.post('/quotes', (req, res) => {
      console.log('Hellooooooooooooooooo!')
      console.log(req.body)
      quotesCollection
        .insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })      
    app.listen(3000, function () {
      console.log('listening on 3000')
    })
  })
  .catch(console.error)

