const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')

// set up express app
const app = express()
const cors = require('cors')

app.use(cors())

// initialize routes
app.use('/', require('./routes'))

// use body-parser middleware
app.use(bodyParser.json())

// listen for requests
app.listen(config.port || 4000, function () {
  console.log('now listening for requests')
})

// FREE CODE CAMP EXAMPLE
//
// const express = require('express')
// const bodyParser = require('body-parser')
// const morgan = require('morgan')
// const {sequelize} = require('./models')
// const config = require('./config/config')

// const app = express()
// app.use(morgan('combined'))

// sequelize.sync()
//   .then(() => {
//     app.listen(config.port || 8080)
//     console.log(`Server started on ${config.port}`)
//   })
