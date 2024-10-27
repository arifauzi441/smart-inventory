let mysql = require(`mysql`)

let connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

connection.connect((err) => {
    if(err) return console.log(err)
        console.log('Berhasil terkoneksi')
})

module.exports = connection