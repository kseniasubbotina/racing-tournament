// const AuthentificationController = require('./controllers/AuthentificationController')

// module.exports = (app) => {
//   app.post('/register',
//     AuthentificationController.register)
//   app.get('/login', function (req, res) {
//     res.send('Hi')
//   })
// }

const express = require('express')
const router = express.Router()
const config = require('./config/config')

class Database {
  constructor (config) {
    this.connection = config.connection
  }
  query (sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) { return reject(err) }
        resolve(rows)
      })
    })
  }
  close () {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) { return reject(err) }
        resolve()
      })
    })
  }
}

const database = new Database(config)

router.get('/races', function (req, res, next) {
  // config.connection.connect()
  database.query('SELECT * FROM races')
    .then(rows => res.send(rows))
})

router.get('/users', function (req, res, next) {
  // config.connection.connect()
  database.query('SELECT * FROM users')
    .then(rows => res.send(rows))
})

module.exports = router
