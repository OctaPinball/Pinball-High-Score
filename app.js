const express = require('express')
const app = express()
const port = 3000

app.use(express.static('views'));

require('./route/route')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
