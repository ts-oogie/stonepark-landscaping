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
    
    let formData = req.body
    let imgPath = req.files[0].path 

    let thisObj = {
        id: "",
        title: "",
        building: "",
        type: "",
        summary: "",
        imgUrl: "",
        xPt: "",
        yPt: ""
    }

    thisObj.id =formData.index
    thisObj.title = formData.title
    thisObj.building = formData.building

    if (formData.design == undefined && formData.repair == undefined && formData.removal == undefined) {
        thisObj.type = "Not Specified"
    }
    if (formData.repair){
        thisObj.type = "Repair"
    }
    if (formData.design){
        thisObj.type = "Design"
    }
    if (formData.removal){
        thisObj.type = "Removal"
    }

    thisObj.summary = formData.summary
    thisObj.imgUrl = imgPath
    thisObj.xPt = formData.xPt
    thisObj.yPt = formData.yPt
    console.log(thisObj)

    const report = require('./report.json');

    console.log(report) 

    report.push(thisObj)
    
    let jsonString = JSON.stringify(report) 

    console.log(jsonString) 
     
    fs.writeFile('report.json', jsonString , function (err) {
        if (err) throw err;
        console.log('Saved!');
    });  

    res.sendFile(__dirname + '/submitted.html') 

}) 

app.listen(port, ()=>{
    console.log("Server running on port 3000")
});
