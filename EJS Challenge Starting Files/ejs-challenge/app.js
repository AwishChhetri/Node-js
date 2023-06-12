//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require('lodash');
const mongoose=require('mongoose');
// const Blog = require('./models/Blog');
const homeStartingContent ="Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/Blog',{useNewUrlParser:true}).then((res)=>{
  console.log('Mongoose db connect');
}).catch((err)=>{
  console.log(err)
})

const blogSchema= new mongoose.Schema({
  Title:String,
  Content:String,
},{
  timestamps:true,
}
)

const Blog=mongoose.model('Blog',blogSchema)

  


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get('/',(req,res)=>{
  res.render("home",{
    startingPara:homeStartingContent,
    Posts:posts,
  });
 

});


app.get('/about',(req,res)=>{
  res.render("about",{startingAbout:aboutContent});
});

app.get('/contact',(req,res)=>{
  res.render("contact",{startingContact:contactContent});
});

app.get('/compose',(req,res)=>{
  res.render("compose");
  
});

app.get('/:userinput',(req,res)=>{
  const userinput=_.lowerCase(req.params.userinput);

  posts.forEach(function(post){
    const storedtitle=_.lowerCase(post.title);
    const storedcontent=_.lowerCase(post.compose);

    // if(userinput===storedtitle){
    //   console.log('Match found');
    // }
    // else{
    //   console.log('Match not found')
    // }

    res.render('post',{
      startingHeader:storedtitle,
      startingPara3:storedcontent
    })
  })
})

app.post('/compose',(req,res)=>{
  const blog=new Blog({
    Title:`${req.body.title}`,
    Content:`${req.body.compose}`,

    
})
  blog.save();

  const allBlogs = await Blog.find({});  
  console.log(req.body.title);
  console.log(req.body.compose);
  const post={
    title: req.body.title,
    compose: req.body.compose,
  }

  posts.push(post);

  res.redirect('/');
})
app.listen('4000',function(){
  console.log('Server running at Server running at http://127.0.0.1:4000/');
});














// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
