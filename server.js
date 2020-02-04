/* VARIABLES */

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const urlencode = bodyParser.urlencoded({
  extended: false
});
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'patrimonium',
  port: '3306'
});

/* FUNCTIONS */

function connect() {
  connection.connect((err) => {
    if (err) {
      console.log(err);
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connected');
  });
}

function disconnect() {
  connection.end((err) => {
    // Terminat the connection
  });
}

function queryToDatabase(query, req, res) {
  //connect()
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      throw err;
      debugger;
    } else {
      console.log('Data received');
      res.send(JSON.stringify(rows));
      console.log(fields);
    }
  });
  //disconnect();
}


/* HEADER SETTINGS */

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Verwijder caching om de laatste data te ontvangen
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

/* CONNECT TO DATABASE */
connect();

/* QUERIES */
/* --> ACADEMIES <-- */

// GET ALL ACADEMIES
app.get('/academies', urlencode, function (req, res) {
  queryToDatabase(`SELECT academies.academy_id, academies.academy_name, academies.academy_headquarter, academies.academy_street, academies.academy_house_number, academies.academy_phone, academies.academy_fax, places.place_name AS academy_place_name, directors.director_last_name AS academy_director_last_name, directors.director_first_name AS academy_director_first_name, directors.director_email AS academy_director_email, homepages.homepage_url AS academy_homepage_url, educational_nets.educational_net_type AS academy_educational_net_type FROM academies JOIN places ON academies.academy_place_id = places.place_id JOIN directors ON academies.academy_director_id = directors.director_id JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id ORDER BY academy_place_name LIMIT 9`, req, res)
})
// GET ONE ACADEMY
app.get('/academies/:id', urlencode, function (req, res) {
  queryToDatabase(`SELECT academies.academy_id, academies.academy_name, academies.academy_headquarter, academies.academy_street, academies.academy_house_number, academies.academy_phone, academies.academy_fax, places.place_name AS academy_place_name, directors.director_last_name AS academy_director_last_name, directors.director_first_name AS academy_director_first_name, directors.director_email AS academy_director_email, homepages.homepage_url AS academy_homepage_url, educational_nets.educational_net_type AS academy_educational_net_type FROM academies JOIN places ON academies.academy_place_id = places.place_id JOIN directors ON academies.academy_director_id = directors.director_id JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id WHERE academies.academy_id = ${req.params.id}`, req, res)
})
// FILTER ACADEMIES BY TECHNICIAN'S INPUT
app.get('/academies/filter/input/:input', urlencode, function (req, res) {
  queryToDatabase(`SELECT academies.academy_id, academies.academy_name, academies.academy_headquarter, academies.academy_street, academies.academy_house_number, academies.academy_phone, academies.academy_fax, places.place_name AS academy_place_name, directors.director_last_name AS academy_director_last_name, directors.director_first_name AS academy_director_first_name, directors.director_email AS academy_director_email, homepages.homepage_url AS academy_homepage_url, educational_nets.educational_net_type AS academy_educational_net_type FROM academies JOIN places ON academies.academy_place_id = places.place_id JOIN directors ON academies.academy_director_id = directors.director_id JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id WHERE academies.academy_id LIKE "%${req.params.input}%" OR academies.academy_name LIKE "%${req.params.input}%" OR academies.academy_street LIKE "%${req.params.input}%" OR academies.academy_house_number LIKE "%${req.params.input}%" OR academies.academy_phone LIKE "%${req.params.input}%" OR academies.academy_fax LIKE "%${req.params.input}%" OR places.place_name LIKE "%${req.params.input}%" ORDER BY academy_place_name LIMIT 9`, req, res)
})
// FILTER ACADEMIES BY HQ
app.get('/academies/filter/hq/:hq', urlencode, function (req, res) {
  queryToDatabase(`SELECT academies.academy_id, academies.academy_name, academies.academy_headquarter, academies.academy_street, academies.academy_house_number, academies.academy_phone, academies.academy_fax, places.place_name AS academy_place_name, directors.director_last_name AS academy_director_last_name, directors.director_first_name AS academy_director_first_name, directors.director_email AS academy_director_email, homepages.homepage_url AS academy_homepage_url, educational_nets.educational_net_type AS academy_educational_net_type FROM academies JOIN places ON academies.academy_place_id = places.place_id JOIN directors ON academies.academy_director_id = directors.director_id JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id WHERE academies.academy_headquarter = ${req.params.hq} ORDER BY academy_place_name LIMIT 9`, req, res)
})
// FILTER ACADEMIES BY TECHNICIAN'S INPUT AND HQ
app.get('/academies/filter/hq/:hq/input/:input', urlencode, function (req, res) {
  queryToDatabase(`SELECT academies.academy_id, academies.academy_name, academies.academy_headquarter, academies.academy_street, academies.academy_house_number, academies.academy_phone, academies.academy_fax, places.place_name AS academy_place_name, directors.director_last_name AS academy_director_last_name, directors.director_first_name AS academy_director_first_name, directors.director_email AS academy_director_email, homepages.homepage_url AS academy_homepage_url, educational_nets.educational_net_type AS academy_educational_net_type FROM academies JOIN places ON academies.academy_place_id = places.place_id JOIN directors ON academies.academy_director_id = directors.director_id JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id WHERE academies.academy_id LIKE "%${req.params.input}%" OR academies.academy_name LIKE "%${req.params.input}%" OR academies.academy_street LIKE "%${req.params.input}%" OR academies.academy_house_number LIKE "%${req.params.input}%" OR academies.academy_phone LIKE "%${req.params.input}%" OR academies.academy_fax LIKE "%${req.params.input}%" OR places.place_name LIKE "%${req.params.input}%" AND academies.academy_headquarter = ${req.params.hq} ORDER BY academy_place_name LIMIT 9`, req, res)
})



app.listen(port, () => console.log(`Server listening on port ${port}`));
