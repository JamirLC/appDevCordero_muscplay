const musicInfo = require('../models/musicInfo');

const jmski = {
    index: (req, res) => {
        const playlistId = req.params.id; // Get playlist ID from route params

        // Fetch data from the 'playlist' table
        musicInfo.getAll((err, playlistResults) => {
            if (err) {
                console.error("Error fetching playlist information:", err);
                res.status(500).send("Error fetching playlist information.");
            } else {
                // Fetch data from the 'musics' table
                musicInfo.getAllS((err, musicResults) => {
                    if (err) {
                        console.error("Error fetching music information:", err);
                        res.status(500).send("Error fetching music information.");
                    } else {
                        if (playlistId) {
                            // If a playlist ID is provided, find the selected playlist
                            const selectedPlaylist = playlistResults.find(playlist => playlist.id == playlistId);

                            // Ensure selectedPlaylist exists before using it
                            if (selectedPlaylist) {
                                musicInfo.selectpd(playlistId, (err, selectedPlaylistMusic) => {
                                    if (err) {
                                        console.error("Error fetching selected playlist details:", err);
                                        res.status(500).send("Error fetching selected playlist details.");
                                    } else {
                                        res.render('index', {
                                            playlists: playlistResults, // All playlists
                                            musics: musicResults,       // All music
                                            selectedPlaylistSongs: selectedPlaylistMusic, // Songs for the selected playlist
                                            playlistName: selectedPlaylist.name // Playlist name
                                        });
                                    }
                                });
                            } else {
                                res.status(404).send("Playlist not found.");
                            }
                        } else {
                            // No playlist selected, show all songs
                            res.render('index', {
                                playlists: playlistResults,   // All playlists
                                musics: musicResults,         // All music
                                selectedPlaylistSongs: musicResults, // Show all songs when no playlist is selected
                                playlistName: "All Songs"     // Use "All Songs" as the default name
                            });
                        }
                    }
                });
            }
        });
    },



    upload: (req, res) => {
        res.render('upload');
    },

    create: (req, res) => {
        res.render('create');
    },

    delete: (req, res) => {
        const id = req.params.id;
        musicInfo.delete(id, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    },


    addToPlaylist: (req, res) => {
        const musicId = req.params.musicId; // Get musicId from route parameters
        const { playlistId } = req.query;  // Get playlistId from form submission

        // Check if playlistId exists
        if (playlistId) {
            musicInfo.addMtoP(playlistId, musicId, (err) => {
                if (err) {
                    console.error("Error adding music to playlist:", err);
                    res.status(500).send("Error adding music to playlist.");
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.status(400).send("No playlist selected.");
        }
    },

    creates: (req, res) => {
        const data = req.body;
        musicInfo.create(data, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    },

    savef: (req, res) => {
        const file = req.file; // Get the uploaded file
        const { title, artist } = req.body; // Get song title and artist from the form

        if (file) {
            const filepath = file.path; // File path where the music is saved

            // Construct the music data object
            const musicData = {
                title: title,
                artist: artist,
                filepath: filepath.replace('public/', '') // Remove 'public/' from path if necessary
            };

            // Save the music data into the database
            musicInfo.save(musicData, (err) => {
                if (err) {
                    console.error("Error saving to database:", err);
                    res.status(500).send("Error saving music information.");
                } else {
                    res.redirect('/'); // Redirect back to homepage after successful upload
                }
            });
        } else {
            res.status(400).send("No file uploaded.");
        }
    }


};

module.exports = jmski;