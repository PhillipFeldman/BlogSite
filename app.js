//const http = require('http');
//const fs = require('fs');
const express = require('express');
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.listen(3000);
//middleware for static files, like images
//without the following, the browser can't access
//files from the server:
app.use(express.static('public'));
//put folder name in parens




app.get('/',(req,res)=>{//url here
res.render('index', {loggedIn:false})})//filename here,

app.get('/index',(req,res)=>{
res.redirect('/')})

app.get('/about',(req,res)=>{
    res.render('about', {loggedIn:false})})

app.get('/signup',(req,res)=>{
        res.render('signup', {loggedIn:false})})

app.get('/login',(req,res)=>{
    res.render('login', {loggedIn:false})})





//404 at the bottom
app.use((req,res)=>{
    res.status(404).render('404', {loggedIn:false})})