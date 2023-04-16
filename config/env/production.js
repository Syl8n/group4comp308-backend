module.exports = {
  db: {
    socket: process.env.DB_SOCKET,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: '',
    options: process.env.DB_OPTIONS
  },
  sessionSecret: process.env.SESSION_SECRET
}