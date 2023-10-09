const express = require('express');
const app = express();
const router = express.Router();
const fs=require('fs')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.send("<h1>Welcome to ExpressJs Tutorial</h1>");
});

/*
- Return all details from user.json file to client as JSON format
*/
let userJson=fs.readFileSync("user.json")
userJson=JSON.parse(userJson)
router.get('/profile', (req,res) => {
  res.send(userJson);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
*/

/*

- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
*/


    /*


- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

router.get("/login", (req, res)=>{
  let q=req.query
  if (userJson.username == q.username && userJson.password==q.password){
    res.send({status:true, message:"User is valid"})
  }
  else if (userJson.username != q.username){
    res.send({status:false, message:"User Name is invalid"})
  }
  else if (userJson.password != q.password){
    res.send({status:false, message:"Password is invalid"})
  }
})

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  res.send(`${req.query.username} successfully logged out.`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));