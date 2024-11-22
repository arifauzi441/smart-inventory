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

    static getById(id){
        return new Promise((resolve, reject) => {
            db.query(`select *, u.username from transaction t 
                join users u on t.cashier_id = u.id_user where transaction_id = ?`, [id], (err, rows) => {
                if(err) reject(err)
                resolve(rows[0])
            })
        })
    }

    static getNewestId(){
        return new Promise((resolve, reject) => {
            db.query(`select t.transaction_id from transaction t 
                join users u on t.cashier_id = u.id_user order by t.transaction_id DESC`, (err, rows) => {
                if(err) reject(err)
                resolve(rows[0].transaction_id)
            })
        })
    }

    static insertData(data){
        return new Promise((resolve, reject) => {
            db.query(`insert into transaction 
                (transaction_date, transaction_time, cashier_id, transaction_event, 
                total_price, payment, return_payment) values ?`, [data], (err, rows) => {
                if(err) reject(err)
                resolve(rows)
            })
        })
    }

}

module.exports = Model_Transaction