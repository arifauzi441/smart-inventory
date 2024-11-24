const db = require(`../db/config`)

class Model_Transaction_Detail{
    static insertDetail(data){
        return new Promise((resolve, reject) => {
            db.query(`insert into transaction_detail (amount_product, price, product_id, transaction_id) 
                values ?`, [data], (err, rows) => {
                if(err) reject(err)
                resolve(rows)
            })
        })
    }

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

    static getBestSeller(){
        return new Promise((resolve, reject) => {
            db.query(`SELECT p.product_name, sum(t.amount_product) as sold FROM 
                transaction_detail t join product p on t.product_id = p.product_id 
                group by p.product_id order by sold desc limit 5`, (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }
}

module.exports = Model_Transaction_Detail