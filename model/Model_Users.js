let db = require(`../db/config`)

class Model_Users{
    static getUser(email, password){
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users where username = ? && password = ? ORDER BY id_user DESC`, [email,password], (err, rows) => {
                if(err) return reject(err)
                resolve(rows[0])
            })
        })
    }

    static getUserById(id){
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users where id_user = ?`, [id], (err, rows) => {
                if(err) return reject(err)
                resolve(rows[0])
            })
        })
    }
}

module.exports = Model_Users