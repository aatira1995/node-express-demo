const express = require('express');
const app = express();

app.use(express.json());

const authors = [
    {id: 1, name: 'author1'},
    {id: 2, name: 'author2'},
    {id: 3, name: 'author3'},
];

app.get('/', (req,res) => {
    res.send('Welcome');
});

app.get('/api/authors', (req,res) => {
    res.send(authors);
});

app.get('/api/authors/:id', (req,res) => {
    const author = authors.find( author => author.id === parseInt(req.params.id));
    if(!author) return res.status('404').send('Author with the ID is not found');
    res.send(author);
});

// app.get('/api/books/:year/:month', (req,res) => {
//     res.send(req.params);
// })

app.get('/api/books/:year/:month', (req,res) => {
    res.send(req.query);
});

app.post('/api/authors', (req,res) => {
    if(!req.body.name || req.body.name.length < 2)
    return res.status(400).send("Name is required and should be more than or equal to 2 characters");
    const author = {
        id: authors.length + 1,
        name: req.body.name
    };
    authors.push(author);
    res.send(author);
})

app.put('/api/authors/:id', (req,res) => {
    const author = authors.find( author => author.id === parseInt(req.params.id));
    if(!author) return res.status('404').send('Author with the ID is not found');
    
    if(!req.body.name || req.body.name.length < 2)
    return res.status(400).send("Name is required and should be more than or equal to 2 characters");

    author.name = req.body.name;
    res.send(author);
})

app.delete('/api/authors/:id', (req,res) => {
    const author = authors.find( author => author.id === parseInt(req.params.id));
    if(!author) return res.status('404').send('Author with the ID is not found');

    const index =  authors.indexOf(author);
    authors.splice(index, 1);

    res.send(author);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`app listening to ${port}`)});