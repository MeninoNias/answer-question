const express = require("express");
const app = express();

app.set('view engeni', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/perguntar', (req, res) => {
    res.render('question');
});

app.listen(8000, ()=>{
    console.log('server start on port 8000');
})