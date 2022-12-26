const express = require('express');
const path = require('path');
const { stringify } = require('querystring');
const GPT = require('./app.js');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    
    let question = "Type in any Question";
    let answer = 'Answer';
    res.render('index.ejs', { question, answer });

    res.end();
});

app.post('/', (req, res) => {
 
     console.log(req.body.question);
    let question = String(req.body.question).toUpperCase();
    GPT(question)
        .then(answer => {
            console.log(answer)
            res.render('index.ejs', { question, answer });
            res.end();
        })
        .catch(err => {console.log(err)})
      
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
    console.log('Press Ctrl+C to quit.');
});
