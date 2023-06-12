const mongoose=require('mongoose');
const express=require('express');
const app=express();
const ejs=express();
app.set('view engine', 'ejs');

mongoose.connect('mongodb:127.0.0.1//3000/datadisplay',{userNewUrlParser:true}).then((res){
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
}

    
)
app.get('/',(req,res)=>{
    res.send("Hello!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
})


app.listen('3000',function(){
   console.log('Server running at Server running at http://127.0.0.1:3000/ ')
}
)