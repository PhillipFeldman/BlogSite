//const http = require('http');
//const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Account = require('./models/accounts')
const Blog = require('./models/blogs')

const dburi = ""
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
                    res.render('create-blog', {firstp:"",accounts:result1,currAcc:result2.email})
                })
                
        
            }).catch((err) =>{console.log(err)})   
                    a = false
                }
            }
            if(a){
            res.render('create-blog', {firstp:"You must be logged in!",accounts:result})}
    
        }).catch((err) =>{console.log(err)})
        })

        app.get('/create-blog/:id',(req,res)=>{//url here
            console.log("In get create-blog/id ")
            const id = req.params.id;
            console.log(id)
            Account.findById(id).then((result) =>{
                
                    res.render('create-blog', {firstp:"Create a Blog!",account:result})
                
                
        
            }).catch((err) =>{console.log(err)})   
            })


            app.get('/my-blogs/:id',(req,res)=>{//url here
                console.log("In get my-blogs/id ")
                const id = req.params.id;
                console.log(id)
                Account.findById(id).then((result) =>{
                    
                        res.render('my-blogs', {firstp:"Your Blogs!",account:result})
                    
                    
            
                }).catch((err) =>{console.log(err)})   
                })

                app.delete('/my-blogs/:idacc/:idblg',(req,res)=>{

                    console.log("In delete my-blogs/id ")
                    const idblg = req.params.idblg;
                    const idacc = req.params.idacc;
                    Account.findById(idacc).then((resultacc)=>{
                    Blog.findByIdAndDelete(idblg)
                    .then(resultblg=>{
                        res.json({redirect: `/my-blogs/${idacc}`})
                    })})
                    .catch(err=>{
                        console.log(err)
                    })

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
//colon : for route parameter
    app.get('/blogs/:id', (req,res)=>{
        Account.find().then((result2) =>{

            const id = req.params.id;
        console.log(id)
        Blog.findById(id).then((result)=>{
            console.log(result)
            res.render('details',{blog:result,firstp:"You are reading this blog on",accounts:result2,lgin:false})
        })

        }).catch((err)=>{console.log(err)})
    })

    app.get('/blogs/:AccId/:BlgId', (req,res)=>{
        const AccId = req.params.AccId;
        Account.findById(AccId).then((result2) =>{

            const BlgId = req.params.BlgId;
        
        Blog.findById(BlgId).then((result)=>{
            console.log(result)
            res.render('details',{blog:result,firstp:"You are reading this blog on",account:result2,lgin:true})
        })

        }).catch((err)=>{console.log(err)})
    })

    app.get('/browse',(req,res)=>{
        Account.find().then((result) =>{
            Blog.find().then((result2)=>{
                console.log(result2)
                res.render('browse', {firstp:"Sign up to the",accounts:result,blogs:result2})})
            
    
        }).catch((err) =>{console.log(err)})
        })

        app.get('/browse/:AccID',(req,res)=>{
            const id = req.params.AccID;
        //console.log(id)
        console.log("got to here1")
            Account.findById(id).then((result) =>{
                console.log("got to here2")
                Blog.find().then((result2)=>{
                    //console.log(result2)
                    console.log("got to here")
                    res.render('browse', {firstp:"Welcome",account:result,blogs:result2})
                })
                
        
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
                a.save().then((result1)=>{res.redirect(`/loggedin/${a._id}`)}).catch((err)=>{console.log(err)})
                break;
            }
        }
        if(a==undefined){
            console.log("login not found")
            res.redirect('/login').catch((err)=>{console.log(err)})
        }

    }).catch((err) =>{console.log(err)})

}))

app.get('/loggedin/:id',(req,res)=>{//url here
    const id = req.params.id;
        console.log(id)
        Account.findById(id).then((result)=>{
            console.log(result)
            res.render('index2',{account:result,firstp:"You are reading this blog on"})
        }).catch((err)=>{console.log(err)})

    })

app.post('/logout',((req,res)=>{
    Account.find().then((result) =>{
        var a;
        console.log(result)
        for(var i =0; i<result.length; i++){
            if(result[i].loggedIn == true){
                a = result[i]
                a.loggedIn = false;
                a.save().then((result1)=>{res.redirect('/')}).catch((err)=>{console.log(err)})
                break;
            }
        } 

    }).catch((err) =>{console.log(err)})

}))


app.post('/create-blog/:id',((req,res)=>{
    console.log("Here")
    const id = req.params.id;
    Account.findById(id).then((result) =>{
        var a;
        console.log(result)
        
                a = result
                let obj = {title: req.body.title,
                    body: req.body.body,
                authorID: a.id}
                const blg = new Blog(obj)
                a.blogs.push(blg)
                blg.save().then((result)=>{a.save().then((result1)=>{res.redirect(`/loggedin/${a._id}`)})}).catch((err)=>{console.log(err)})
                

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
