////post request code
fetch('api/notes', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(noteObject)
})
.then(response => {
    if(response.ok) {
        return response.json();
    }
    alert('Error:' + response.statusText);
})
.then(postResponse => {
    console.log(postResponse);
    alert('you have successfully added a new note!')
})

