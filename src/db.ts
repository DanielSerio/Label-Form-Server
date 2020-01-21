import mongoose = require('mongoose');

mongoose.connect((process.env.DBURI as string), { useNewUrlParser: true });

const db: mongoose.Connection = mongoose.connection;


db.on('error', (e: Error) => console.error(e));

db.once('open', () => console.log('DB OPEN'));

export default db;