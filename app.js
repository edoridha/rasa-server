const express = require('express')
const app = express()
const port =  process.env.PORT || 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(require('./routers'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })