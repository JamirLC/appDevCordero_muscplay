const db = require('../config/db');
const information = {
    save: (data, callback) => {
        const query = "INSERT INTO musics (title, filepath) values(?, ?)";
        db.query(query, [data.title, data.filepath], callback);
    },
    create: (data, callback) => {
        const query = "INSERT INTO playlist (name) values(?)";
        db.query(query, [data.name], callback);
    },
    getAll: (callback) => {
        const query = "SELECT * FROM playlist";
        db.query(query, callback);
    },
    getAllS: (callback) => {
        const query = "SELECT * FROM musics";
        db.query(query, callback);
    }
};

module.exports = information;