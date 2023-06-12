const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Email",{useNewUrlParser:true}).then((res)=>{
    console.log('mongoose db connected');
  }).catch((err)=>{
    console.log(err)
  }) 

const emailschema=new mongoose.Schema({
    name:String,
    number:Number,
    email:String,
},
{
        timestamps:true
    })
    
const EmailId=mongoose.model('EmailId',emailschema);
// console.log("Schema created")

// EmailId.insertOne(email, { bufferTimeoutMS: 30000 });
// group1.save().then((response)=>{
//   console.log(response)
// });

const creatDocuments=async()=>{

  try{
    const group1=new EmailId({
      name:"anshu",
      number:123,
      email:"anshu@chhetri"
  
  })
  
  // const group2=new EmailId({
  //   name:"rinji",
  //   number:456,
  //   email:"aknsdkasd@jsjcnj"
  // })

  const required=await group1.save();
  console.log(required);
  }


  catch(err)
{
    console.log(err)
}
 

  
}