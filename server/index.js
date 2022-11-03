const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root123",
    database: "employee_table"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extende:true}));

app.get("/api/get", (req,res) => {
    const sqlGet = "SELECT * FROM employee";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/", (req,res)=> {
    const sqlInsert = "INSERT INTO employee (emp_name,department,city,salary) VALUES ('Goutham','Js', 'Hyd', 12000)";
    db.query(sqlInsert, (error,result) => {
        console.log("error", error);
        console.log("result", result);
        res.send("sql server")
    });
}); 

app.listen(1000, () => {
    console.log(`Heloo World!...  Server is Running on Port: 1000`);
}); 

