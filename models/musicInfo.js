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
    },
    selectp: (id, callback) => {
        const query = "SELECT * FROM playmusic where playlist_id =?";
        db.query(query, [id], callback);
    },
    selectpd: (id, callback) => {
        const query = `
        SELECT p.playlist_id, pl.name AS playlist_name, m.id AS music_id, m.title, m.filepath 
        FROM playmusic p 
        JOIN musics m ON p.music_id = m.id 
        JOIN playlist pl ON p.playlist_id = pl.id 
        WHERE p.playlist_id = ?
    `;
        db.query(query, [id], callback);
    }


};

module.exports = information;