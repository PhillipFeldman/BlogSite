const http = require('http');
const fs = require('fs');
const app = require('express');

const server = http.createServer((req,res)=>{
    console.log('request made');
    res.setHeader('Content-Type','text/html');
    
    let path = './views';
    switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        case '/about-site':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end()
        case '/login':
            path += '/login.html';
            res.statusCode = 200;
            break;
        case '/signup':
            path+= '/signup.html';
            res.statusCode = 200;
            break;
        default:
            path += '/404.html'
            res.statusCode = 404;
            break;
    }
    
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        } else{
            res.write(data);
            res.end();
        }
        
    })
})

server.listen(3000,'localhost',()=>{
console.log('listening on port 3000');
})