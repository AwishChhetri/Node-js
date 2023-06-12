const express=require('express');
const bodyParser=require('body-parser');
const { error, timeStamp } = require('console');
const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/SignUpPage',{useNewUrlParser:true}).then((res)=>{
    console.log('mongoose db connected');
  }).catch((err)=>{
    console.log(err)
  }) 
const signSchema= new mongoose.Schema({
    email:String,
    password:String,
},{
    timestamps:true,
}
    
)




const Sign =mongoose.model('Sign',signSchema)


var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.redirect('/SignIn');
})
app.get("/SignIn",function(req,res){
    res.sendFile(__dirname+"/SignIn.html");

})

// app.get("/contact",function(req,res){
//     res.send("<h1>Call me in this number:123456789<h1>")
// })

app.post('/',function(req,res){
    console.log(req.body);
    // const {email,password}=req.body;
    // console.log(email,password);
    console.log(req.body.email,req.body.password)
    // res.send(req.body.password);
    // res.send(res.body.password);
    const signPage=new Sign({
        email:`${req.body.email}`,
        password:`${req.body.password}`,
    })
    signPage.save();
    res.send("<h1>Thankyou for your response!!!<h1>")
    
})

app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`)
});
mongoose.connection.close();
