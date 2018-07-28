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
const con = require('./config/config')

router.get('/races', function (req, res, next) {
  con.connect(function (err) {
    if (err) throw err
    con.query('SELECT * FROM races', function (err, result, fields) {
      if (err) throw err
      res.send(result)
    })
  })
})

module.exports = router
