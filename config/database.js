//import mysql
const mysql = require("mysql");
//import dotenv and running conf method
require("dotenv").config();


//destructing object process.env
const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE
} = process.env

/**
 * make db connection with CreateConnection method
 * method recived some params (host, user, password, database)
 * update db conf from .env file
 */
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
});

/**
 * connecting the db with connect method
 * where the method recive callback
 */
db.connect((err) => {
    if (err) {
        console.log("Error connecting" + err.stack);
        return;
    } else {
        console.log("Connected to database");
        return;
    }
});

//export db
module.exports = db;