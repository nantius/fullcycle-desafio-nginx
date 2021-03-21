const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')

app.get('/', async (req,res) => {
    const connection = mysql.createConnection(config)
    const presql = "CREATE TABLE IF NOT EXISTS `nodedb`.`people`(`name` VARCHAR(255) NOT NULL);"
    connection.query(presql, () => {
        const sql = `INSERT INTO people(name) values('Joãozinho')`
        connection.query(sql , () => {
            const sql = `SELECT * from people;`;
            connection.query(sql, (error, results, fields) => {
                let html = '<h1>Full Cycle Rocks!</h1><ul>';
                results.forEach(person => {
                    html += `<li>${person.name}</li>`;
                });
                html += "</ul>";
                connection.end();
                res.send(html);
            });
        })
    }) 
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})