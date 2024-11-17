const db = require(`../db/config`)

class Model_Transaction_Detail{
    static getByTransId(id){
        return new Promise((resolve, reject) => {
            db.query(`select d.*, p.* from transaction_detail d
                join product p on d.product_id = p.product_id
                where d.transaction_id = ?`, [id], (err, rows) => {
                if(err) reject(err)
                resolve(rows)
            })
        })
    }

    static getByMonth(month){
        return new Promise((resolve, reject) => {
            db.query(`SELECT p.product_name, sum(d.amount_product) as amount FROM transaction_detail d 
                join transaction t on d.transaction_id = t.transaction_id 
                join product p on d.product_id = p.product_id 
                where MONTH(t.transaction_date) = ? 
                GROUP BY d.product_id ORDER BY amount DESC`, [month], (err, rows) => {
                if(err) reject(err)
                resolve(rows[0])
            })
        })
    }

    static getByDay(day){
        return new Promise((resolve, reject) => {
            db.query(`SELECT p.product_name, sum(d.amount_product) as amount FROM transaction_detail d 
                join transaction t on d.transaction_id = t.transaction_id 
                join product p on d.product_id = p.product_id 
                where DAYNAME(t.transaction_date) = ? 
                GROUP BY d.product_id ORDER BY amount DESC`, [day], (err, rows) => {
                if(err) reject(err)
                resolve(rows[0])
            })
        })
    }

    static getByEvent(event){
        return new Promise((resolve, reject) => {
            db.query(`SELECT p.product_name, sum(d.amount_product) as amount FROM transaction_detail d 
                join transaction t on d.transaction_id = t.transaction_id 
                join product p on d.product_id = p.product_id 
                where t.transaction_event = ? 
                GROUP BY d.product_id ORDER BY amount DESC`, [event], (err, rows) => {
                if(err) reject(err)
                resolve(rows[0])
            })
        })
    }

}

module.exports = Model_Transaction_Detail