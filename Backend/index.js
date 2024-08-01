// // index.js
// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// const port = 3000;

// app.use(express.json());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'newuser',
//     password: 'newpassword',
//     database: 'interview_db'
//   });
  

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Database.');
// });

// // Routes
// app.post('/interviews', (req, res) => {
//   const { post_name, interview_date, interviewer_name } = req.body;
//   const sql = 'INSERT INTO interviews (post_name, interview_date, interviewer_name) VALUES (?, ?, ?)';
//   db.query(sql, [post_name, interview_date, interviewer_name], (err, result) => {
//     if (err) throw err;
//     res.send('Interview added.');
//   });
// });

// app.post('/interviewees', (req, res) => {
//   const { name, address, birth_date, gender, interview_id } = req.body;
//   const sql = 'INSERT INTO interviewees (name, address, birth_date, gender, interview_id) VALUES (?, ?, ?, ?, ?)';
//   db.query(sql, [name, address, birth_date, gender, interview_id], (err, result) => {
//     if (err) throw err;
//     res.send('Interviewee added.');
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
    password: 'newpassword',
  database: 'interview_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL Database.');
});

app.post('/interviews', (req, res) => {
  const { post_name, interview_date, interviewer_name } = req.body;
  const query = 'INSERT INTO interviews (post_name, interview_date, interviewer_name) VALUES (?, ?, ?)';
  db.query(query, [post_name, interview_date, interviewer_name], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(result);
  });
});

app.post('/interviewees', (req, res) => {
  const { name, address, birth_date, gender, interview_id } = req.body;
  const query = 'INSERT INTO interviewees (name, address, birth_date, gender, interview_id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, address, birth_date, gender, interview_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
