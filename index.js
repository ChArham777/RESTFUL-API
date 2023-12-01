const express=require('express');
const users=require('./MOCK_DATA.json')
const app=express();
const PORT=8000;
app.use(express.json());
app.listen(PORT,()=>console.log('SERVER STARTE AT PORT:${PORT}'));
app.get("/", function (req, res) {
    res.send("Hello World");
  });
  
  app.get("/api/search", function (req, res) {
    res.send("API Search");
  });
  
  app.get("/api/users", function (req, res) {
    res.send(users);
  });
  
  app.get("/api/users/:id", function (req, res) {
    users.forEach(element => {
      if(
      element.id === parseInt(req.params.id)
      ){
        res.send(element);
      }
    
  });
})
  
  app.put("/api/users/:id", function (req, res) {

    users.forEach(element => {
      if(
      element.id === parseInt(req.params.id)
      ){
        element.first_name = req.body.first_name;
        element.last_name = req.body.last_name;
        element.email=req.body.email;
        element.gender=req.body.gender;
      
        res.send(element);
      }
      else{
        res.send('Not Foundd')
      }
      
    });
    
    // const users = users.find(p => p.id === req.params.id);
    // if (!users) return res.status(404).send("users not found");
    // console.log(req.body.first_name)
  
  
  });
  
  app.delete("/api/users/:id", function (req, res) {
    const index = users.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("users not found");
  
    users.splice(index, 1);
    res.send(users);
  });
  
  app.post("/api/users", function (req, res) {
    const newUser = {
      id: users.length + 1,
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email:req.body.email,
      gender:req.body.gender
    };
  
    users.push(newUser);
    res.send(newUser);
  });
  
console.log(users);
