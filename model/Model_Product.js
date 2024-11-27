const db = require(`../db/config`)

class Model_Product{
    static getProduct(){
        return new Promise((resolve, reject) => {
            db.query(`select * from product order by product_id desc`, (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }

    static getBySearch(search){
        return new Promise((resolve, reject) => {
            let data = []
            for (let i = 0; i < 7; i++) {
                data.push(`%${search}%`)
            }
            db.query(`select * from product 
                where product_name like ? OR product_price like ?
                OR product_stock like ? OR product_minimum_stock like ?
                OR product_id like ?`, data, (err, rows) => {
                if(err) reject(err)
                resolve(rows)
            })
        })
    }

    static storeProduct(data){
        return new Promise((resolve, reject) => {
            db.query(`insert into product set ?`, [data], (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }

    static getProductById(id){
        return new Promise((resolve, reject) => {
            db.query(`select * from product where product_id = ?`, [id], (err, rows) => {
                if(err) return reject(err)
                resolve(rows[0])
            })
        })
    }

    static updateProduct(data, id){
        return new Promise((resolve, reject) => {
            db.query(`update product set ? where product_id = ?`, [data, id], (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }

    static deleteProduct(id){
        return new Promise((resolve, reject) => {
            db.query(`delete from product where product_id = ?`, [id], (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }

    static updateStock(stock,id){
        return new Promise((resolve, reject) => {
            db.query(`update product set product_stock = product_stock + ? where product_id = ?`, [stock, id], (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }

    static reduceStock(updates,caseStatement,data){
        return new Promise((resolve, reject) => {
            db.query(`UPDATE product SET product_stock = CASE
                    ${caseStatement} END WHERE product_id 
                    IN (${updates.map(item => '?').join(', ')})`, data, (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }

    static getProductByStock(){
        return new Promise((resolve, reject) => {
            db.query(`select * from product where product_stock <= product_minimum_stock`, (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }

    static getProductPair(id){
        return new Promise((resolve, reject) => {
            db.query(`SELECT t2.product_id AS product_b, p.product_name, COUNT(*) AS frequency 
                FROM transaction_detail t1 JOIN transaction_detail t2 
                ON t1.transaction_id = t2.transaction_id AND t1.product_id != t2.product_id 
                JOIN product p ON t2.product_id = p.product_id WHERE t1.product_id = ? 
                GROUP BY t1.product_id, t2.product_id ORDER BY frequency DESC`, [id], (err, rows) => {
                if(err) return reject(err)
                resolve(rows[0]?.product_name)
            })
        })
    }
    
}

module.exports = Model_Product