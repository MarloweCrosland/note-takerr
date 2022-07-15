//require express npm
const express = require('express');
// import path module
const path = require('path');
const { notes } = require('./db/db');
// instantiate the server
const app = express();
// specifying port number
const PORT = 3007;

//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//parse incoming JSON data
app.use(express.json());



//adding API routes
app.get('/api/notes', (req, res) => {
    //this needs to read the db.json file and return all saved notes as JSON
})

app.post('/api/notes', (req, res) => {
    //this should recieve a new note to save on the request body, add it to
    //the db.json file, and then return the new note to the client. Each note
    //should have a unique id when its saved. (look into npm packages)
})


//adding HTML routes
app.get('/notes', (req, res) => {
    //this needs to return the notes.html file
    res.sendFile(path.join(__dirname, '/public/assets/notes.html'));
})

app.get('*', (req, res) => {
    //this needs to return the index.html file
    res.sendFile(path.join(__dirname, '/public/assets/index.html'));
})


app.delete('/api/notes/:id', (req, res) => {
    //should recieve a query parameter containing the id of a note to delete.
    //in order to delete a note youll need to read all notes from the db.json
    //file, remove the note with the given id property, then rewrite the notes
    //to the db.json file
})

//making server listen to port 3007
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}`);
});


