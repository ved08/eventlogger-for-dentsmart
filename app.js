const sqlite3 = require('sqlite3').verbose();
const dbPath = './sqlite/logs.db' // DB path here
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

async function connectToDBAndSendQuery(query) {
    let data;
    await db.all(query, [], (err, rows) => {
        if (err) throw err;
        rows.forEach(row => {data = row})
    })
    return data
}
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
    db.close()
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
    db.close()
}
function newEvent(uid, type, date, month) {
    const query = `INSERT INTO logs(uid, type, log_time, month) VALUES(?, ?, ?, ?)`
    db.run(query, [uid, type, date, month], err => {
        if(err) throw err
        else {
            console.log("added the new event")
        }
    })
    db.close()
}

// EXAMPLE newEvent:
// newEvent(1234567894, "link", "2023-11-08", 11)
// EXAMPLE getCount:
// getCount(1234567894, 11, "link")
// EXAMPLE getHistory
// getHistory(1234567894)