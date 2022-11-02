const express = require('express')
const app = express()
const port = 3000

app.use(express.static('views'));

//const session = require('express-session');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

require('./route')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
