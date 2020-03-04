/* VARIABLES */

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const urlencode = bodyParser.urlencoded({
  extended: true
});
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'patrimonium',
  port: '3306'
});

const users = [];

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
  express.json();
  bodyParser.json();
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

app.get('/users', bodyParser.json(), (req, res) => {
  queryToDatabase(`SELECT user_id, user_username, user_password, user_roles.role_role AS 'user_role', updated_at AS 'user_updated_at', created_at AS 'user_created_at', user_country_code, user_last_name, user_first_name, departments.department_name AS 'user_department', user_functions.user_function_description AS 'user_user_function', levels.level_description AS 'user_level', user_email, user_mobile, provinces.province_name AS 'user_province_name', user_birth_day
FROM users
JOIN user_roles ON users.user_role_id = user_roles.role_id
JOIN departments ON users.user_department_id = departments.department_id
JOIN user_functions ON users.user_user_function_id = user_functions.user_function_id
JOIN levels ON users.user_level_id = levels.level_id
JOIN provinces ON users.user_province_id = provinces.province_id`, req, res)
})

app.post('/signup', bodyParser.json(), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)
    const user = {
      name: req.body.name,
      password: hashedPassword
    }
    users.push(user)
    res.status(201).send(`${user.name} was created!\nHis password is ${user.password}`, user)
  } catch {
    res.status(500).send('Something went wrong!')
  }
});

app.post('/login', bodyParser.json(), async (req, res) => {
  const query = `
  SELECT users.user_id, users.user_password, users.user_username, users.updated_at, users.created_at, users.user_country_code, users.user_last_name, users.user_first_name, users.user_email, users.user_mobile, users.user_birth_day, provinces.province_name AS user_province_name, levels.level_description AS user_level, user_functions.user_function_description AS user_function_description, departments.department_name AS user_department, user_roles.role_role AS user_role
  FROM users
  JOIN user_roles ON users.user_role_id = user_roles.role_id
  JOIN departments ON users.user_department_id = departments.department_id
  JOIN user_functions ON users.user_user_function_id = user_functions.user_function_id
  JOIN levels ON users.user_level_id = levels.level_id
  JOIN provinces ON users.user_province_id = provinces.province_id
  WHERE user_username = '${req.body.name}'
  AND user_password = '${req.body.password}'
  `
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      const user = Object(rows)[0];
      if (user == null) {
        console.log('Console: Cannot find user')
        return res.status(400).send('Cannot find user.')
      }
      try {
        console.group('Data:')
        console.log(`Request-password:\n ${req.body.password}`)
        console.log(`Request-name:\n ${req.body.name}`)
        console.log('User:', user)
        console.groupEnd('Data')
        if (req.body.password == user.user_password) {
          res.send(user)
        } else {
          res.send('Not allowed!')
        }
      } catch {
        res.status(500).send('Login failed.')
      }
    }
  });
})

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


/* --> PIANOS <-- */

app.get('/pianos/:academyId', urlencode, (req, res) => {
  queryToDatabase(`SELECT pianos.piano_id, sorts.sort_sort AS 'piano_sort', brands.brand_name AS 'piano_brand', types.type_type AS 'piano_type', pianos.piano_serial_number, academies.academy_id AS 'piano_academy_id', pianos.piano_room FROM pianos JOIN sorts ON pianos.piano_sort_id = sorts.sort_id JOIN brands ON pianos.piano_brand_id = brands.brand_id JOIN types ON pianos.piano_type_id = types.type_id JOIN academies ON pianos.piano_academy_id = academies.academy_id WHERE pianos.piano_academy_id = ${req.params.academyId}`, req, res)
})

app.delete('/pianos/delete/:pianoID', urlencode, (req, res) => {
  queryToDatabase(`DELETE FROM pianos WHERE pianos.piano_id = ${req.params.pianoID}`, req, res)
})


/* --> LOGS <-- */
app.get('/logs/:pianoId', urlencode, (req, res) => {
  queryToDatabase(`SELECT
logs.log_id, logs.log_date, logs.log_comment, logs.log_tuning, logs.log_regulation, logs.log_intonation,
users.user_username AS log_user_username, users.user_email AS log_user_user_email,
pianos.piano_serial_number AS log_piano_piano_serial_number, pianos.piano_id,
sorts.sort_sort AS log_sort_sort_sort,
brands.brand_name AS log_brand_brand_name
FROM logs
JOIN users ON logs.log_user_id = users.user_id
JOIN pianos ON logs.log_piano_id = pianos.piano_id
JOIN brands ON pianos.piano_brand_id = brands.brand_id
JOIN sorts ON pianos.piano_sort_id = sorts.sort_id
JOIN academies ON pianos.piano_academy_id = academies.academy_id
WHERE logs.log_piano_id = ${req.params.pianoId};`, req, res)
})

app.post('/logs/post', bodyParser.json(), (req, res) => {
  console.log(req.body)
  queryToDatabase(`INSERT INTO logs (log_id, log_date, log_user_id, log_comment, log_piano_id, log_tuning, log_regulation, log_intonation) VALUES (${req.body.log_id}, ${req.body.log_date}, ${req.body.log_user_id}, "${req.body.log_comment}", ${req.body.log_piano_id}, ${req.body.log_tuning}, ${req.body.log_regulation}, ${req.body.log_intonation})`, req, res)
})

/* --> ROOMS <-- */

app.put('/rooms/update', bodyParser.json(), (req, res) => {
  console.log(req.body);
  queryToDatabase(`UPDATE pianos SET piano_room = ${req.body.newRoom} WHERE piano_id = ${req.body.pianoID};`, req, res)
})


app.listen(port, () => console.log(`Server listening on port ${port}`));
