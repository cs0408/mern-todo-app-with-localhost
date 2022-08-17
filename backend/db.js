const mongoose = require('mongoose')

const db_url =
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPEMENT_DB_URI
    : process.env.PRODUCTION_DB_URI

exports.connectDatabase = () => {
  mongoose
    .connect(db_url)
    .then((con) =>
      console.log(`Database Connected with: ${con.connection.host}`)
    )
    .catch((err) => console.log(err))
}
