//const http = require('http');
//const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Account = require('./models/accounts')

const dburi = "mongodb+srv://chillfill:BlogSiteTutorial@blogsite.k0nswrh.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburi).then((result)=>app.listen(3000)).catch((err)=>console.log(err));

app.set('view engine','ejs');
app.set('views','views');


//middleware for static files, like images
//without the following, the browser can't access
//files from the server:
app.use(express.static('public'));
//put folder name in parens




app.get('/',(req,res)=>{//url here
    Account.find().then((result) =>{
        res.render('index', {accounts:result})

    }).catch((err) =>{console.log(err)})



    })

app.get('/index',(req,res)=>{
res.redirect('/')})

app.get('/about',(req,res)=>{
    Account.find().then((result) =>{
        res.render('about', {accounts:result})

    }).catch((err) =>{console.log(err)})



    })

app.get('/signup',(req,res)=>{
    Account.find().then((result) =>{
        res.render('signup', {accounts:result})

    }).catch((err) =>{console.log(err)})



    })

app.get('/login',(req,res)=>{
    Account.find().then((result) =>{
        res.render('login', {accounts:result})

    }).catch((err) =>{console.log(err)})



    })


app.get('/add-account',(req,res)=>{
    const acc = new Account({
        email:'pfeldman@berkeley.edu',
        password:'123',
        loggedIn: false
    });
    acc.save().then((result)=>res.send(result)).catch((err)=>{
        console.log(err);
    })
})


//404 at the bottom
app.use((req,res)=>{
    Account.find().then((result) =>{
        res.status(404).render('404', {accounts:result})

    }).catch((err) =>{console.log(err)})



    })