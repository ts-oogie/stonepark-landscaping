const express = require('express');   
const app = express();    
const fs = require('fs'); 
const path = require('path');
const cors = require('cors'); 
const nodeMailer = require('nodemailer')

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

const urlencodedParser = bodyParser.urlencoded({
    extended : false
});  



app.use(bodyParser.json())
 
app.use(cors()); 

const port = process.env.PORT || 8000;  

app.use('/images', express.static(__dirname + '/images'));  
app.use('/styles', express.static(__dirname + '/styles'));  
app.use('/updates/styles', express.static(__dirname + '/styles'));  
app.use('/updates/images', express.static(__dirname + '/images'));  
app.use('/scripts', express.static(__dirname + '/scripts'));

app.use('/bower_components', express.static(__dirname + '/bower_components'));   
app.use('/node_modules', express.static(__dirname + '/node_modules'));  

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});   

async function mail(title, building, type, summary, img){

    const html = `
        <img src="/images/stonepark-BG.jpg" width="300">  
        <h2>${title}</h2>
        <h3>Building : ${building}</h3>
        <h3>Type : ${type}</h3>
        <h3>Summary : ${summary}</h3>
        <img src="cid:img@beautifystonepark" width="300">  
    `  
    const email = ['onagususa@gmail.com' , 'coachkenwoods@yahoo.com ', 'adamjngo@gmail.com']

    const trans = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'beautifystonepark@gmail.com',
            pass: 'eefj yxyn yshn prva' //google app password
        }
    })

    const data = await trans.sendMail({
        from: 'Beautify Stonepark<onagususa@gmail.com>',
        to: 'onagususa@gmail.com',
        subject: 'A new item was added to Stonepark Beautification',
        html: html,
        attachments: [{
            filename: 'attachment.jpeg',
            path: './' + img,
            cid: 'img@beautifystonepark'
        }]

    })
 
}

app.get('/' , function(req, res ){  
        res.sendFile(__dirname + '/home.html');
});

app.get('/updates/:id', (req, res)=>{
    let htmlStr = req.params.id
    res.sendFile(__dirname + '/updates/' + htmlStr + '.html')
})

app.get('/json', (req, res)=>{
    res.sendFile(__dirname + '/report.json');
})

//Sept 7, 2023 : post historyArr
app.post('/history', urlencodedParser, (req, res)=>{ 
    console.log("JSON received")
    console.log(req.body);  
    //var obj = Object.keys(req.body)[0];
    //console.log(JSON.parse(JSON.stringify(obj))); 
}); 

app.post('/upload', upload.any(), (req, res)=>{

    //**************** September 10, 2023 : ****************
    //if there is a req, send email via node mailer to beautifyStonepark@gmail.com
        //as a part of email, send image url, title, id, summary, type, building number
    
    let formData = req.body
    let imgPath = req.files[0].path 

    console.log(imgPath)

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
    if (formData.trim){
        thisObj.type = "Trim"
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
    
    //Nodemail to email address
    mail(thisObj.title, thisObj.building, thisObj.type, thisObj.summary, thisObj.imgUrl)

    res.sendFile(__dirname + '/submitted.html') 

}) 

app.listen(port, ()=>{
    console.log("Server running on port 3000")
});
