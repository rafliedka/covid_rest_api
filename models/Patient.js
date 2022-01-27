//import db
const db = require("../config/database.js");
const { patch } = require("../routes/api.js");

//create Patient model class
class Patient {

  /**
   * creating static all method for get all data from table patients
   * @param {resolve} param used when the promise done
   * @param {reject} param used when the promise can't be done
   * @param {query} param object who save queries for database
   * @param {err} param
   * @param {result} param
   */
  static all(){
    return new Promise((resolve, reject) => {
        const query = "SELECT * from patients"

        db.query(query, (err, result) => {
          err ? reject(err) : resolve(result);
        });
    });
  }

  /**
   * creating static create method for created writed data to database
   * @param {data} req data patient want to input
   * @param {resolve} param used when the promise done
   * @param {reject} param used when the promise can't be done
   * @param {query} param object who save queries for database
   * @param {err} param
   * @param {result} param 
   */
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

  /**
   * creating static find method for search patient based on id
   * @param {id} req patient id want to search
   * @param {resolve} param used when the promise done
   * @param {reject} param used when the promise can't be done
   * @param {query} param object who save queries for database
   * @param {err} param
   * @param {result} param 
   */
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        const [patient] = results;
        err ? reject(err) : resolve(patient);
      });
    });
  }

  /**
   * creating static update method for updating writed data to database
   * @param {id} req patient id want to search
   * @param {data} req data patient want to input
   * @param {resolve} param used when the promise done
   * @param {reject} param used when the promise can't be done
   * @param {query} param object who save queries for database
   * @param {err} param
   * @param {result} param 
   */
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

  /**
   * creating static delete method for deleting data from database
   * @param {id} req patient id want to search
   * @param {resolve} param used when the promise done
   * @param {reject} param used when the promise can't be done
   * @param {query} param object who save queries for database
   * @param {err} param
   * @param {result} param 
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM patients WHERE id = ?";

      db.query(query, id, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  /**
   * creating static search method for search data based on name of patient
   * @param {name} req patient name want to search
   * @param {resolve} param used when the promise done
   * @param {reject} param used when the promise can't be done
   * @param {query} param object who save queries for database
   * @param {err} param
   * @param {result} param 
   */
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