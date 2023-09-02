const express = require('express');   
const app = express();    
const fs = require('fs'); 
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage})
  
const bodyParser = require('body-parser');   

app.use(bodyParser.urlencoded({
    extended : true
}));

const port = process.env.PORT || 8000;  

app.use('/images', express.static(__dirname + '/images'));  
app.use('/styles', express.static(__dirname + '/styles'));  
app.use('/scripts', express.static(__dirname + '/scripts'));

app.use('/bower_components', express.static(__dirname + '/bower_components'));   
app.use('/node_modules', express.static(__dirname + '/node_modules')); 


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});   

app.get('/' , function(req, res ){ 
    res.sendFile(__dirname + '/home.html');
});

app.get('/json', (req, res)=>{
    res.sendFile(__dirname + '/report.json');
})

app.post('/upload', upload.any(), (req, res)=>{
    let thisRes = req.body
    console.log(req.body) 
    //open report.json
    res.send("HELLO")
    //read through each
})

console.log("App running at :" + process.env.PORT)

app.listen(port, ()=>{
    console.log("Server running on port 3000")
});
