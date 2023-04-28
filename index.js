const express = require('express')
const session = require('express-session')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: "session",
    saveUninitialized: true,
    resave: false,
    cookie:{
        maxAge: 1000*60*60,
    }
}))


app.get('/', (req,res)=>{
    res.status(200).json({message: 'Get Path Working'})
})

app.post('/sign', (req,res)=>{

    const {username, password} = req.body;

    console.log('signup page');
    req.session.username = username;
    req.session.password = password;
    // req.session.xyz = 'testing';
    if(username && password){
        res.status(200).json({messgae: 'Post Path Working'})
    }else{
        res.status(200).json({message: 'redirected'});
    }
})

app.get('/home', (req,res)=>{

    if(req.session.username){
        // console.log(req.session.username);
        // console.log(req.session.password);
        // console.log(req.session.xyz); // this shows you can put anything in sessions...
        res.status(200).json({message: 'Home Path Working'});
    }else{
        res.redirect('/');
    }
})

app.get('/logout', (req,res)=>{
    // console.log(req.session.destroy());
    res.status(200).redirect('/');
})


app.listen(3000, (err)=>{
    if(err)
        console.log(err)
    else
        console.log('App Started at port 3000');
})