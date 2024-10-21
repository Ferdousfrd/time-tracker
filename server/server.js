#!/usr/bin/env node

// A simple local server meant to be used as 
// the back end for the programming assignment.
// Run from the command line with node, e.g.,
// "node server.js --init --port=3010 --verbose".
// (--init will restore the database in its default state,
// --port can be used to set the port, and --verbose 
// echoes information about the operations to the 
// standard output.)
// Created by TJH (2024). For the time being, this 
// should be considered as a work in progress, and 
// not as a finished product. Suggestions for improvements 
// are welcome.

const bodyParser = require('body-parser');
const { error } = require('console');
const express = require('express')
const cors = require('cors');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(bodyParser.json());
app.use(cors());
let port = 3010;

let init = false;
let empty = false;
let verbose = false;

// Handle the command line arguments
let nextIsPort = false;
for (let arg of process.argv) {
  if (arg) {
    if (nextIsPort) {
      port = +arg;
      nextIsPort = false;
    }
    else {
      if (arg.startsWith('--init') || arg === '-i') {
        init = true;
      }
      else if (arg.startsWith('--empty') || arg === '-e') {
        init = true;
        empty = true;
      }
      else if (arg.startsWith('--verbose') || arg === '-v') {
        verbose = true;
      }
      else if (arg.startsWith('--port') || arg === '-p') {
        if (arg.split('=').length > 1) {
          port = +(arg.split('=')[1]);
        }
        else {
          nextIsPort = true;
        }
      }
    }
  }  
}

//const data_store = ':memory:'
const data_store = './db_file.db'


// Instead of this, decided to take a softer approach to
// resetting the situation and not to remove the file, but just 
// to drop the existing tables and recreate them. This way, the
// possible problems with file being used by other processes
// (such as some database manager programs like DBeaver) are avoided. 
/*
if (init) {
  fs.unlinkSync(data_store); 
}
*/

if (!fs.existsSync(data_store)) {
  console.log(`Creating the DB file ${data_store}.`);
  fs.writeFileSync(data_store, '');
  init = true;
}

let db = new sqlite3.Database(data_store, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Connected to the database, using ${data_store} as the data store.`);
});

// create tables and populate them with default data
if (init) {
  console.log("Initializing the database.");
  let initial_tags = ['household chore', 'school', 'hobby', 'important', 'full stack'];
  let placeholders = initial_tags.map((tag) => '(?)').join(',');
  if (verbose) {
    console.log('Ditching the possibly existing data.');
  }
  db.serialize(() => {
    db.run('DROP TABLE IF EXISTS tags;')
      .run('DROP TABLE IF EXISTS tasks;')
      .run('DROP TABLE IF EXISTS timestamps;')
      .run('DROP TABLE IF EXISTS options;')
      .run('CREATE TABLE tags (id INTEGER PRIMARY KEY, name TEXT);')
      .run('CREATE TABLE tasks (id INTEGER PRIMARY KEY, name TEXT, tags TEXT);')
      .run('CREATE TABLE timestamps (id INTEGER PRIMARY KEY, timestamp TEXT, task INTEGER, type INTEGER);')
      .run('CREATE TABLE options (id INTEGER PRIMARY KEY, theme TEXT, alternative INTEGER, own_textual_data TEXT);')
    }
  );
  // Ugly hardcoding, but will do for now.
  // TODO: read the initial data from an external file.
  if (!empty) {
    if (verbose) {
      console.log('Populating the database with default data.');
    }
    db.serialize(() => {
      db.run('INSERT INTO tags (name) VALUES ' + placeholders, initial_tags)
        .run(`INSERT INTO tasks (name, tags) VALUES ('feed the cat', '1,4');`)
        .run(`INSERT INTO tasks (name, tags) VALUES ('code', '2,3,4,5');`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-26 16:23:02.000', 1, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 19:00:33.542', 1, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 20:12:04.823', 1, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 21:48:59.002', 1, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 00:52:00.999', 1, 1);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 19:04:14.000', 1, 1);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 21:34:17.000', 1, 1);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 13:13:13.345', 2, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 19:10:06.917', 2, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 21:01:07.427', 2, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 14:13:13.555', 2, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 19:44:26.231', 2, 0);`)
        .run(`INSERT INTO timestamps (timestamp, task, type) VALUES ('2024-09-27 21:39:09.111', 2, 0);`)
        .run(`INSERT INTO options (theme, alternative, own_textual_data) VALUES ('default', 0, '');`)
        .each(`SELECT * FROM tags;`, (err, row) => {
          if (err) {
            throw err;
          }
          if (verbose) {
            console.log(row);
          }
        })
        .each(`SELECT * FROM tasks;`, (err, row) => {
          if (err) {
            throw err;
          }
          if (verbose) {
            console.log(row);
          }
        })
        .each(`SELECT * FROM timestamps;`, (err, row) => {
          if (err) {
            throw err;
          }
          if (verbose) {
            console.log(row);
          }
        })
        .get(`SELECT * FROM options;`, (err, row) => {
          if (err) {
            throw err;
          }
          if (verbose) {
            console.log(row);
          }
        });
    });
  }
}

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  if (verbose) {
    console.log('Closing the database connection ok.');
  }
});

const make_query = (query, returnId=false) => {
  db = new sqlite3.Database(data_store, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
  if (returnId) {
    return new Promise((resolve, reject) => {
      db.run(query, function (err) {
        if (err) {
          reject(err);
        }
        resolve(JSON.stringify({id: this.lastID}));
      });
    });
  }
  else {  
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          if (verbose) {
            console.log('Closing the database connection ok.');
          }
        });
        if (err) {
          reject(err);
        }
        resolve(JSON.stringify(rows));
      });
    });
  }
}


// *** THE ENDPOINTS ***

app.get('/', (req, res) => {
  const d = new Date();
  res.send(`Hello, hello! The server is running, and this is the root.
    Now it is ${d.toLocaleDateString("fi-FI")} 
    and the time is ${d.toLocaleTimeString("fi-FI")}.`);
});

// GET an options item
app.get('/options/:id', (req, res) => {
  const id = req.params.id;
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (verbose) {
    console.log(`Fetching the options item with ID ${id}.`);
  } 
  make_query(`SELECT * FROM options WHERE id = ${id} LIMIT 1`)
    .then((result) => {
      if (verbose) {
        console.log(JSON.stringify(JSON.parse(result), null, 2));
      }
      res.send(result)
    });
});

// GET all the stuff from the collection resources
// (with a name ending with 's')
app.get('/:foos', (req, res) => {
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (req.params.foos.endsWith('s')) {
    if (verbose) {
      console.log(`Fetching all the ${req.params.foos}.`);
    } 
    make_query(`SELECT * FROM ${req.params.foos}`)
      .then((result) => {
        if (verbose) {
          console.log(JSON.stringify(JSON.parse(result), null, 2));
        }
        res.send(result)
      });
  }
  else {
    res.send('No such endpoint.');
  }
});

// GET all the timestamps for a specific task
app.get('/timesfortask/:task', (req, res) => {
  const task = req.params.task;
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (verbose) {
    console.log(`Fetching all the timestamps for task ${task}.`);
  } 
  make_query(`SELECT * FROM timestamps WHERE task = ${task} ORDER BY timestamp;`)
    .then((result) => {
      if (verbose) {
        console.log(JSON.stringify(JSON.parse(result), null, 2));
      }
      res.send(result)
    });
});

// GET all the timestamps of certain type for a specific task
app.get('/timesfortask/:task/:type', (req, res) => {
  const task = req.params.task;
  const type = req.params.type;
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (verbose) {
    console.log(`Fetching all the timestamps of type ${type} for task ${task}.`);
  } 
  make_query(`SELECT * FROM timestamps WHERE task = ${task} AND type = ${type} ORDER BY timestamp;`)
    .then((result) => {
      if (verbose) {
        console.log(JSON.stringify(JSON.parse(result), null, 2));
      }
      res.send(result)
    });
});

// GET a specific item
app.get('/:foos/:id', (req, res) => {
  const foos = req.params.foos;
  const id = req.params.id;
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (req.params.foos.endsWith('s')) {
    if (verbose) {
      console.log(`Fetching an item from ${foos} with ID ${id}.`);
    } 
    make_query(`SELECT * FROM ${foos} WHERE id = ${id} LIMIT 1`)
      .then((result) => {
        if (verbose) {
          console.log(JSON.stringify(JSON.parse(result), null, 2));
        }
        res.send(result)
      });
  }
  else {
    res.send(`No collection resource called ${foos}.`);
  }
});


// POST a new item
app.post('/:foo', async (req, res) => {
  const foo = req.params.foo;
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (verbose) {
    console.log(`Adding a new item to ${foo}.`);
  }
  let query;
  if (foo === 'tags') {
    query = `INSERT INTO tags (name) VALUES ('${req.body.name}')`;
  } 
  else if (foo === 'tasks') {
    query = `INSERT INTO tasks (name, tags) VALUES ('${req.body.name}', '${req.body.tags}')`;
  }
  else if (foo === 'timestamps') {
    query = `INSERT INTO timestamps (timestamp, task, type) VALUES ('${req.body.timestamp}', '${req.body.task}', '${req.body.type}')`;
  }
  result = await make_query(query, true);
  if (verbose) {
    console.log(result);
  }
  res.send(result);
});

// PUT a new item
app.put('/:foos/:id', async (req, res) => {
  const foos = req.params.foos;
  const id = req.params.id;
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (verbose) {
    console.log(`Adding or replacing an item to ${foos} with ID ${id}.`);
  }
  let query;
  if (foos === 'tags') {
    query = `INSERT OR REPLACE INTO tags (id, name) VALUES (${id}, '${req.body.name}')`;
  } 
  else if (foos === 'tasks') {
    query = `INSERT OR REPLACE INTO tasks (id, name, tags) VALUES (${id}, '${req.body.name}', '${req.body.tags}')`;
  }
  else if (foos === 'timestamps') {
    query = `INSERT OR REPLACE INTO timestamps (id, timestamp, task, type) VALUES (${id}, '${req.body.timestamp}', '${req.body.task}', '${req.body.type}')`;
  }
  else if (foos === 'options') {
    query = `INSERT OR REPLACE INTO options (id, theme, alternative, own_textual_data) VALUES (${id}, '${req.body.theme}', '${req.body.alternative}', '${req.body.own_textual_data}')`;
  } 
  result = await make_query(query, true);
  if (verbose) {
    console.log(result);
  }
  res.send(result);
});

// PATCH an item
app.patch('/:foos/:id', async (req, res) => {
  const foos = req.params.foos;
  const id = req.params.id;
  let error = false;
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (verbose) {
    console.log(`Updating content of the item in ${foos} with ID ${id}.`);
  }
  let query;
  console.log(req.body);
  
  const keys = Object.keys(req.body);
  const assignments = keys.map((key) => `${key} = '${req.body[key]}'`).join(', ');
  if (assignments.length > 0) {
    query = `UPDATE ${foos} SET ` + assignments + ` WHERE id = ${id};`;
    try {
      await make_query(query);
      result = JSON.stringify({id: id});
    }
    catch (err) {
      result = JSON.stringify({error: err.message});
      console.error(err.message);
      error = true;
    }
  }
  else {
    result = JSON.stringify({error: 'No valid fields to update.'});
  }
  if (verbose && !error) {
    console.log(result);
  }  
  res.send(result);
});

// DELETE an item
app.delete('/:foos/:id', async (req, res) => {
  const foos = req.params.foos;
  const id = req.params.id;
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  if (verbose) {
    console.log(`Deleting /${foos}/${id}.`);
  }
  let query = `DELETE FROM ${foos} WHERE id = ${id}`;
  result = await make_query(query);
  if (verbose) {
    console.log(result);
  }
  res.send(result);
});

app.listen(port, () => {
  console.log(`Listening for API requests on port ${port}!`)
});