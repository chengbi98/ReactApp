'use strict';

const axios = require('axios');

const book = {
    'author': 'V.S. Ramachandran',
    'title': 'Phamtoms',
    'published': '1998-01-01'
};

axios.delete('http://localhost:3000/books/10')
//axios.post('http://localhost:3000/books', book)
//axios.put('http://localhost:3000/books/4', book)
.then(response => {
    console.log(response);    
})
.catch(error => {
    console.log(error);
})
