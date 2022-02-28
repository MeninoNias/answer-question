const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const connection = require("./database/database");
const Question = require("./database/Question")

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

app.get('/', (req, res) => {
    Question.findAll({raw: true, order:[
        ['createdAt', 'DESC']
    ]})
        .then(questions => {
            res.render('index', {questions: questions});
        })
        .catch(err => {
            console.log(err);
        });

});

app.get('/question', (req, res) => {
    res.render('create_question');
});

app.get('/question/:id', (req, res) => {
    var id = req.params.id;
    Question.findOne({
        where: {id: id}
    }).then(question => {
        if (question != undefined){
            res.render('detail_question');
        }
        else{
            res.redirect('/');
        }
    });
});

app.post('/question', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    Question.create({title: title, description: description}).then(() => {
        res.redirect('/');
    });
});

app.listen(8000, () => {
    console.log('server start on port 8000');
})