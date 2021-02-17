const express = require('express')
const bodyParser = require('body-parser')
const parserRouter = require('./routes/parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/parse', parserRouter)

module.exports = app
