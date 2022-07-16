//require express npm
const express = require('express');
//import fs module
const fs = require('fs');
// import path module
const path = require('path');
const { notes } = require('/Users/marlowecrosland/Desktop/projects/note-takerr/db/db.json');
// instantiate the server
const app = express();
// specifying port number options
const PORT = process.env.PORT || 3007;

//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//parse incoming JSON data
app.use(express.json());



//adding API routes
app.get('/api/notes', (req, res) => {
    //this needs to read the db.json file and return all saved notes as JSON
    res.json(notes);
})

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        //using path to join the folders directory name with the db file
        path.join(__dirname, './db/db.json'),
        //the null and 2 arguments format the data to be more readable
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}

function validateNote(note) {
    //if the fields are empty or the wrong type, return false
    if (!note.title || typeof note.title !== 'string' ) {
        return false;
    }
    if (!note.text || typeof note.text !== 'string'){
        return false;
    } 
    return true
  
}

app.post('/api/animals', (req, res) => {
    //req.body is where incoming content will be
    //set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
    // if any data cant be validate, send 400 error
    if (!validateNote(req.body)){
        res.status(400).send('this note is not formatted correctly!');
    } else {
        //add note to json file and notes array
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
  
})


//adding HTML routes
app.get('/notes', (req, res) => {
    //this needs to return the notes.html file
    res.sendFile(path.join(__dirname, '/public/assets/notes.html'));
})

app.get('/index', (req, res) => {
    //this needs to return the index.html file
    res.sendFile(path.join(__dirname, '/public/assets/index.html'));
})

//filters through all the notes and picks the id that matches, then returns it
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}


//displays the item with the id num in the url parameter, if it doesnt exist,
//displays 404 error.
app.get('/api/notes/:id', (req, res) => {
   const result = findById(req.params.id, notes);
   if (result) {
       res.json(result);
   } else {
       res.send(404);
   }
});

app.post('/deleteNote/:id', (req, res) => {

    //should recieve a query parameter containing the id of a note to delete.
    //in order to delete a note youll need to read all notes from the db.json
    //file, remove the note with the given id property, then rewrite the notes
    //to the db.json file

    console.log('req.params.id');
    const deleteNotes = note.filter(item => item.id != req.params.id);
    note = deleteNotes;
    return res.redirect('/') ;
})

//making server listen to port 3007
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}`);
});


