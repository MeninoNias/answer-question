const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const connection = require("./database/database");
const Question = require("./database/Question")
const Answer = require("./database/Answer")

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
            Answer.findAll({
                where: {question: question.id},
                order:[
                    ['createdAt', 'DESC']
                ]
            }).then(answers => {
                res.render('detail_question', {question: question, answers: answers});
            }).catch(err => {
                console.log(err);
            });
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

app.post('/answer', (req, res) => {
    var answer = req.body.data_text;
    var question = req.body.question;
    Answer.create({
        description: answer,
        question: question
        })
        .then(() => {
            res.redirect(`/question/${question}`);
        })
        .catch(err => {
            console.log(err)
        });
});

app.listen(8000, () => {
    console.log('server start on port 8000');
})