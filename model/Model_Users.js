let db = require(`../db/config`);

class Model_Users {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`select * from users order by id_user desc`, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static getUser(email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users where username = ? && password = ? ORDER BY id_user DESC`,
        [email, password],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0]);
        }
      );
    });
  }

  static getUserById(id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users where id_user = ?`, [id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0]);
      });
    });
  }

  static deleteUsers(id) {
    return new Promise((resolve, reject) => {
      db.query(`delete from users where id_user = ?`, [id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static storeUsers(data) {
    return new Promise((resolve, reject) => {
      db.query(`insert into users set ?`, data, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static updateUsers(data, id) {
    return new Promise((resolve, reject) => {
      db.query(
        `update users set ? where id_user = ?`,
        [data, id],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = Model_Users;
