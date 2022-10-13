const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'));

require('./route/index')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
