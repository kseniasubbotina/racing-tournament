module.exports = {
  port: process.env.PORT || 8080,
  db: {
    database: process.env.DB_NAME || 'tournament',
    user: process.env.DB_USER || 'tournament',
    password: process.env.DB_PASS || 'tournament',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      torage: './tournament.sqlite'
    }
  }
}
