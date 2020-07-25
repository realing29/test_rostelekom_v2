const express = require('express')
const bodyParser = require('body-parser')

const disksRoutes = require('./routes/disks.routes')
const directoryRoutes = require('./routes/directory.routes')
const copyRoutes = require('./routes/copy.routes')
const deletionRoutes = require('./routes/deletion.routes')
const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/disks', disksRoutes)
app.use('/api/directory', directoryRoutes)
app.use('/api/copy', copyRoutes)
app.use('/api/deletion', deletionRoutes)

module.exports = app
