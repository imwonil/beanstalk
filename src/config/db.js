const mysql = require('mysql')

const db = mysql.createConnection({
    
        "host":"kios.cue1zvg9anrt.ap-northeast-2.rds.amazonaws.com" ,
        "user":"admin" ,
        "password":"emc2wonil",
        "port": "3306",
       "database": "NICE"


})

db.connect();
module.exports = db;db;