//const http = require('http');
//const fs = require('fs');
const express = require('express');
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.listen(3000);

app.get('/',(req,res)=>{//url here
res.render('index')})//filename here

app.get('/index',(req,res)=>{
res.redirect('/')})

app.get('/about',(req,res)=>{
    res.render('about')})

app.get('/signup',(req,res)=>{
        res.render('signup')})

app.get('/login',(req,res)=>{
    res.render('login')})





//404 at the bottom
app.use((req,res)=>{
    res.status(404).render('404')})