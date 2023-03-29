const express = require('express');
// const mysql = require('mysql');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mateito04',
  database: 'cocteles'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/cocteles', (req, res) => {
  const nombre = req.body.nombre;

  const sql = `SELECT * FROM cocktails WHERE nombre = '${nombre}'`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(`${nombre} ya está incluido en la lista de cocteles`);
    } else {
      const sql = `INSERT INTO cocktails (nombre) VALUES ('${nombre}')`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`${nombre} ha sido incluido en la lista de cocteles`);
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor web escuchando en http://localhost:${port}`);
});
