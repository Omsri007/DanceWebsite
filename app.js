const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.connect('mongodb://localhost/ContactDance', {useNewUrlParser: true});
const port = 80;


//Define mongooose Schema
var contactSchema = new mongoose.Schema({
    name: String, 
    phone: String, 
    email: String, 
    address: String, 
    desc: String, 
});

var Contact = mongoose.model('Contact', contactSchema)

//Express Specific Stuff
app.use('/static', express.static('static')) //For serving static files
app.use(express.urlencoded())

//PUG Specific Stuff
app.set('view engine', 'pug') //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //Set the views directory

//Endpoints
app.get('/', (req,res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug',);
})

//Start the Server
app.listen(port, ()=>{
    console.log('The application started successfully on port $(80)');
});