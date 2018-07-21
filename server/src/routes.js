const AuthentificationController = require('./controllers/AuthentificationController')

module.exports = (app) => {
  app.post('/register',
    AuthentificationController.register)
  app.get('/login', function (req, res) {
    res.send('Hi')
  })
}
