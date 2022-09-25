const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/tasks',function(req, res, next){
  console.log('hello /tasks');
  });


  app.get('/',function(req, res, next){
  console.log('hello / with GET');
  });


  app.post('/',function(req, res, next){
  console.log('hello / with POST');
  });
*/