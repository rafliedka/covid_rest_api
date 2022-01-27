//import db
const db = require("../config/database.js");
const { patch } = require("../routes/api.js");

//create Patient model class
class Patient {
  //create static all method
  static all(){
    return new Promise((resolve, reject) => {
        const query = "SELECT * from patients"

        db.query(query, (err, result) => {
          err ? reject(err) : resolve(result);
        });
    });
}

static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {
        err ? reject(err) : resolve(results.insertId);
      });
    });

    const patient = await this.find(id);
    return patient;
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        const [patient] = results;
        err ? reject(err) : resolve(patient);
      });
    });
  }

  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const query = "UPDATE patients SET ? WHERE id = ?";

      db.query(query, [data, id], (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });

    const patient = await this.find(id);
    return patient;
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM patients WHERE id = ?";

      db.query(query, id, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE name LIKE ?";

      db.query(query, "%" + name + "%", (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve,reject) => {
      const query = "SELECT * FROM patients WHERE status = ?";

      db.query(query, status, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }
}

//export patient class
module.exports = Patient;