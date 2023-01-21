//const http = require('http');
//const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Account = require('./models/accounts')
const Blog = require('./models/blogs')

const dburi = "mongodb+srv://chillfill:BlogSiteTutorial@blogsite.k0nswrh.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburi).then((result)=>app.listen(3000)).catch((err)=>console.log(err));

app.set('view engine','ejs');
app.set('views','views');


//middleware for static files, like images
//without the following, the browser can't access
//files from the server:
app.use(express.static('public'));
//put folder name in parens


app.use(express.urlencoded({extended:true}));//to handle post requests of form data




app.get('/',(req,res)=>{//url here
    Account.find().then((result) =>{
        res.render('index', {firstp:"Welcome to the",accounts:result})

    }).catch((err) =>{console.log(err)})



    })

    app.get('/create-blog/',(req,res)=>{//url here
        
        Account.find().then((result) =>{
            var a = true;
            for(var i =0; i< result.length; i++){
                if(result[i].loggedIn==true){
                    console.log(`create-blog/${result[i].id}`)
                    const id = result[i].id;
            console.log(id)
            Account.find().then((result1) =>{
                Account.findById(id).then(result2 => {
                    res.render('create-blog', {firstp:"Create a Blog!",accounts:result1,currAcc:result2.email})
                })
                
        
            }).catch((err) =>{console.log(err)})   
                    a = false
                }
            }
            if(a){
            res.render('create-blog', {firstp:"Create a Blog!",accounts:result})}
    
        }).catch((err) =>{console.log(err)})
        })

        app.get('/create-blog/:id',(req,res)=>{//url here
            const id = req.params.id;
            console.log(id)
            Account.find().then((result) =>{
                Account.findById(id).then(result1 => {
                    res.render('create-blog', {firstp:"Create a Blog!",accounts:result,currAcc:result1})
                })
                
        
            }).catch((err) =>{console.log(err)})   
            })

app.get('/index',(req,res)=>{
res.redirect('/')})

app.get('/about',(req,res)=>{
    Account.find().then((result) =>{
        res.render('about', {firstp:"About the",accounts:result})

    }).catch((err) =>{console.log(err)})



    })

app.get('/signup',(req,res)=>{
    Account.find().then((result) =>{
        res.render('signup', {firstp:"Sign up to the",accounts:result})

    }).catch((err) =>{console.log(err)})



    })

app.post('/signup',((req,res)=>{
    console.log(req.body.email)
    let obj = {email: req.body.email,
    password: req.body.password,
loggedIn:false,
blogs:[]}
    

    const acc = new Account(obj)//req.body.<acc property>, loggedIn = false
    
    acc.save().then((result)=>{res.redirect('/login')}).catch((err)=>{console.log(err)})
console.log(req.body)
}))

app.post('/login',((req,res)=>{
    Account.find().then((result) =>{
        var a;
        console.log(result)
        for(var i =0; i<result.length; i++){
            if(result[i].email == req.body.email && result[i].password == req.body.password){
                a = result[i]
                a.loggedIn = true;
                a.save().then((result1)=>{res.redirect('/')}).catch((err)=>{console.log(err)})
                break;
            }
        }

    }).catch((err) =>{console.log(err)})

}))

app.get('/login',(req,res)=>{
    Account.find().then((result) =>{
        res.render('login', {firstp:"Login to the",accounts:result})

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
        res.status(404).render('404', {firstp:"404 to the",accounts:result})

    }).catch((err) =>{console.log(err)})



    })