const express = require("express");
const app = express();

app.set('view engeni', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});

app.listen(8000, ()=>{
    console.log('server start on port 8000');
})