const mongoose=require('mongoose');
const http = require('node:http');
const fs=require('fs');
const hostname = '127.0.0.1';
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Sign',{useNewUrlParser:true}).then((err,res)=>{
  if(err) throw err;
  console.log('mongoose db connected');
}).catch((err)=>{
  console.log(err)
})

const usesSchemma =new mongoose.Schema({
    name:{
      type:String,
      allowNull:true,
      maxLength:250
    },
    email:{
      type:String,
      allowNull:true,
      maxLength:250,
    unique:true 
   }
  },{
    timestamps:true
  })

  const user=mongoose.model('Users',usesSchemma);
console.log('schemma created')



const server = http.createServer((req, res) => {
    fs.readFile('home.html',(err,data)=>{
     console.log("error",err);
     // console.log("data ",data.toString('utf8'));
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(data);
     return res.end();
    })
 });

 server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });