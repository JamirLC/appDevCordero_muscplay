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
    delete: (id, callback) => {
        const query = "DELETE FROM musics WHERE id =?";
        db.query(query, [id], callback);
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
    },
    // // Delete a song entirely from the musics table
    // delete: (musicId, callback) => {
    //     const query = "DELETE FROM musics WHERE id = ?";
    //     db.query(query, [musicId], callback);
    // },

    // // Remove a song from a specific playlist
    // removeMfromP: (playlistId, musicId, callback) => {
    //     const query = "DELETE FROM playmusic WHERE playlist_id = ? AND music_id = ?";
    //     db.query(query, [playlistId, musicId], callback);
    // },

    // Add a song to a playlist
    addMtoP: (playlistId, musicId, callback) => {
        const query = "INSERT INTO playmusic (playlist_id, music_id) VALUES (?, ?)";
        db.query(query, [playlistId, musicId], callback);
    }



};

module.exports = information;