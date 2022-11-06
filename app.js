const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(
  session({
      secret: 'secret'
  })
);

require('./route')(app);

app.use((err, req, res, next) => {
  res.end('Problem...');
  console.log(err);
});

app.use(function (req, res, next) {
  res.tpl = {};
  res.tpl.error = [];

  return next();
});

app.use(function (err, req, res, next) {
  res.status(500).send('Houston, we have a problem!');

  //Flush out the stack to the console
  console.error(err.stack);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
