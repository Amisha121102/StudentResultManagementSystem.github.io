const express=require('express');
const app=express();

const port=5000;
const mongoose=require('mongoose'); //connecting to mongodb

//connect to mongodb and listening for requests
mongoose.connect("mongodb://127.0.0.1:27017/studentResult",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});

const db=mongoose.connection;
db.on("error",(error)=>console.log(error));
db.once("open", () => console.log("connected"));

app.set('view engine','ejs');
//middlewares and static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());


//express layouts
var expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout','layouts/layout');

//teacher and student routes
const teachRoutes=require("./routes/teacherRoutes");
const studRoutes=require("./routes/studentRoutes");
app.use("/teacher",teachRoutes);
app.use("/student",studRoutes);

//routes
app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`);
});


//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});