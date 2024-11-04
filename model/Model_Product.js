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

    static getProductByStock(){
        return new Promise((resolve, reject) => {
            db.query(`select * from product where product_stock < 20`, (err, rows) => {
                if(err) return reject(err)
                resolve(rows)
            })
        })
    }
    
}

module.exports = Model_Product