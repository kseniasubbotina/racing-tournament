const express = require('express')
const bodyParser = require('body-parser')

// set up express app
const app = express()

// initialize routes
app.use('/', require('./routes'))

// use body-parser middleware
app.use(bodyParser.json())

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log('now listening for requests')
})

// FREE CODE CAMP EXAMPLE
//
// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const morgan = require('morgan')
// const {sequelize} = require('./models')
// const config = require('./config/config')

// const app = express()
// app.use(morgan('combined'))
// app.use(bodyParser.json())
// app.use(cors())

// require('./routes')(app)

// sequelize.sync()
//   .then(() => {
//     app.listen(config.port || 8080)
//     console.log(`Server started on ${config.port}`)
//   })
