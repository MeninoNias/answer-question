const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const connection = require("./database/database");

connection.
    authenticate()
    .then(()=>{
        console.log("Connection Sucess");
    })
    .catch(()=>{
        console.log("Connection Failure")
    });

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('index');
});

app.get('/question', (req, res) => {
    res.render('question');
});

app.post('/question', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    res.send(`${title}, ${description}`);
});

app.listen(8000, () => {
    console.log('server start on port 8000');
})