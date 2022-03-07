const express = require('express')
const kue = require('kue')
const next = require('next')
const redis = require('redis')
const mongoose = require('mongoose')

const queue = kue.createQueue()
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev })
const handle = app.getRequestHandler()

const client = redis.createClient()
client.on('connect', function() {
  console.log("Connected to Redis...")
})

mongoose.connect('mongodb://localhost:27017/testcases', { useNewUrlParser: true, useUnifiedTopology: true });

app.prepare().then(() => {

  const server = express()
  server.use(express.json())

  server.use('/programming', require('./api/routes/programming'))
  server.use('/quiz', require('./api/routes/quiz'))

  server.all("*", (req, res) => {
    return handle(req, res);
  })
 
  server.listen(port, () => {
    console.log("server running on port " + port)
  })
})
