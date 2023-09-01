const sqlite3 = require('sqlite3').verbose();
// Open a SQLite database connection
const db = new sqlite3.Database('./sqlite/logs.db');

// Create the "logs" table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS logs (
    uid TEXT,
    type TEXT,
    log_time DATETIME, 
    month INTEGER
)`, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Rooms database ready!');
    }
});

function getHistory(uid) {
    db.all(`select * from logs where logs.uid=${uid}`, [], (err, rows) => {
    if(err) {
        throw err
    } else {
        if(rows.length === 0) {
            console.log("no data found")
        } else {
            console.log("data found")
            // do stuff with rows here
            console.log(rows)
        }
    }
})
}

function getCount(uid, month, type) {
    db.all(`select * from logs where logs.uid= ? and month= ? and type= ?`, [uid, month, type], (err, rows) => {
        if(err) {
            throw err
        } else {
            console.log("number of times clicked is: ", rows.length)
        }  
    })
}

function newEvent(uid, type, date, month) {
    const query = `INSERT INTO logs(uid, type, log_time, month) VALUES(?, ?, ?, ?)`
    db.run(query, [uid, type, date, month], err => {
        if(err) throw err
        else {
            console.log("added the new event")
        }
    })
}

// EXAMPLE newEvent:
// newEvent("1234567894", "link", "2023-05-08", 5);
// EXAMPLE getCount:
// getCount("1234567894", 9, "link")
// EXAMPLE getHistory
// getHistory("1234567894")

// PEFORM DB QUERIES BEFORE THIS LINE
db.close(err => {
    if(!err) console.log()
})
