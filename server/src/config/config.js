// module.exports = {
//   port: process.env.PORT || 8080,
//   db: {
//     database: process.env.DB_NAME || 'tournament',
//     user: process.env.DB_USER || 'tournament',
//     password: process.env.DB_PASS || 'tournament',
//     options: {
//       dialect: process.env.DIALECT || 'sqlite',
//       host: process.env.HOST || 'localhost',
//       torage: './tournament.sqlite'
//     }
//   }
// }

var mysql = require('mysql')

var con = mysql.createConnection({
  host: 'andrej0h.beget.tech',
  user: 'andrej0h_rt',
  password: 've*JWq3c',
  database: 'andrej0h_rt'
})

module.exports = con
