'use strict';

const mysql = require('mysql');
const db = require('../config/db');

const connectionPool = {

    pool: null,

    init: function() {
//        console.log("Initializing pool");
        this.pool = mysql.createPool(db);
    },

    getPool: function() {
        return this.pool;
    }
}

module.exports = connectionPool;