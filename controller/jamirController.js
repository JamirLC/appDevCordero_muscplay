const musicInfo = require('../models/musicInfo');

const jmski = {
    index: (req, res) => {
        musicInfo.getAll((err, results) => {
            if (err) {
                console.error("Error fetching music information:", err);
                res.status(500).send("Error fetching music information.");
            } else {
                res.render('index', { information: results });
            }
        });
    },

    upload: (req, res) => {
        res.render('upload');
    },

    create: (req, res) => {
        res.render('create');
    },

    creates: (req, res) => {
        const data = req.body;
        musicInfo.create(data, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    },

    savef: (req, res) => {
        const file = req.file;
        const { title, artist } = req.body;

        if (file) {
            const filepath = file.path;

            const musicData = {
                title: title,
                artist: artist,
                filepath: filepath
            };

            musicInfo.save(musicData, (err) => {
                if (err) {
                    console.error("Error saving to database:", err);
                    res.status(500).send("Error saving music information.");
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.status(400).send("No file uploaded.");
        }
    }
};

module.exports = jmski;
