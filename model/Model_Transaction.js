const db = require(`../db/config`)

class Model_Transaction{
    static getAll(){
        return new Promise((resolve, reject) => {
            db.query(`select * from transaction t 
                join users u on t.cashier_id = u.id_user`, (err, rows) => {
                if(err) reject(err)
                resolve(rows)
            })
        })
    }

}

module.exports = Model_Transaction