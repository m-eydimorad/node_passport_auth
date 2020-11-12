'use strict';
const mysql = require('mysql');

//Connection 1
const dbConn1 = mysql.createConnection({
  host: 'localhost',
  //user     : 'ramzelcx_ramzelcx',
  //password : 'I#jVi0VJSDCc',
  user: 'root',
  password: 'sina@mysql',
  database: 'ramzelcx_cryptodb'
});

dbConn1.connect(function (err) {
  if (err) throw err;
  console.log("Database connection 1 has been Connected!");
});

module.exports = { dbConn1 };