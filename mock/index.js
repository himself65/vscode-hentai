const express = require('express')

const app = express()

app.get(/\/illusts\/*/, require('./illusts'))

module.exports = app
