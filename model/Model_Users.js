let db = require(`../db/config`)

class Model_Users{
    static getUser (){
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users ORDER BY id_user DESC`, (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }
}

module.exports = Model_Users