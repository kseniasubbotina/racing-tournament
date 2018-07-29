var mysql = require('mysql')
module.exports = {
  connection: mysql.createConnection({
    host: 'andrej0h.beget.tech',
    user: 'andrej0h_rt',
    password: 've*JWq3c',
    database: 'andrej0h_rt'
  }),
  port: process.env.PORT || 4000
}
