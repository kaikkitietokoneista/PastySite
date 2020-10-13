const sqlite3 = require('sqlite3').verbose()
const express = require('express')
const ejs = require('ejs')

require('dotenv').config()

const app = express()
const db = new sqlite3.Database(':memory:')

const port = process.env.PORT

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}))

app.use(express.static('static'))

db.run(`CREATE TABLE IF NOT EXISTS pastes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  paste TEXT NOT NULL,
  private BOOLEAN
);`);

/*db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    console.log(row.id + ": " + row.info);
});*/

app.get('/', function(req, res) {
  res.render('index')
})

app.post('/uusi', function(req, res) {
  db.get(`SELECT name, paste FROM pastes WHERE name = ?`, [req.body.nimi], (err, row) => {
    if (row) {
      res.render('index', {
        nimi: req.body.nimi,
        teksti: req.body.teksti,
        ilmoitus: 'Valitse uusi nimi'
      })
    } else {
      db.run(`INSERT INTO pastes (name, paste) VALUES (?, ?);`, [req.body.nimi, req.body.teksti], function(err) {
        if (err) throw err
      });
      res.redirect(`/pastyt/${req.body.nimi}`)
    }
  })
})

app.get('/uusi', function(req, res) {
  res.redirect('/')
})

app.get('/random', function(req, res) {
  db.get(`SELECT name FROM pastes ORDER BY RANDOM() LIMIT 1;`, [], (err, row) => {
    if (row) {
      res.redirect(`/pastyt/${row.name}`)
    } else {
      res.redirect('/')
    }
  })
})

app.get('/pastyt/:pasty', function(req, res) {
  let pasty = req.params.pasty
  db.get(`SELECT name, paste FROM pastes WHERE name = ?`, [pasty], (err, row) => {
    if (err) throw err
    if (row) {
      res.render('pasty', {
        nimi: row.name,
        teksti: row.paste,
        error: true
      })
    } else {
      res.render('pasty', {
        nimi: 'Pastya ei löytynyt. - 404',
        teksti: 'Voit kuitenkin paistaa etusivuillamme sellaisen.',
        error: true
      })
    }
  })
})

app.get('*', function(req, res) {
  res.redirect('/')
})

app.listen(port)
