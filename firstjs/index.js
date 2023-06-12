const http = require('node:http');
const fs=require('fs');
const hostname = '127.0.0.1';
const port = 3000;
// const readline=require('readline');
// const { stdin, stdout } = require('node:process');

// const rl=readline.createInterface({
//     input:process.stdin,
//     output:process.stdout,
// })

// rl.question('What is your name',(name)=>{
//     console.log(`hello,${name} how are your doing?`);
//     rl.close();
// })
const mongoose=require('mongoose');
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

const people= new users({

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});