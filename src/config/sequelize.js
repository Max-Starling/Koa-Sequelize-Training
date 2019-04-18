module.exports = {
  "development": {
    username: "root",
    password: "fafafa",
    database: "starling",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  "test": {
    username: "root",
    password: "fafafa",
    database: "starling",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  "production": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
    logging: false
  }
}
