const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('index');
});

app.get('/question', (req, res) => {
    res.render('question');
});

app.listen(8000, () => {
    console.log('server start on port 8000');
})