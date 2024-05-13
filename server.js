const express = require('express');
const app = express();
const  bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const path=require('path');


app.use(express.json());
app.use(express.urlencoded({extended:false}));

const signDB =require('./Module/LoginDB');  
// Folders: 
app.use('/Styles',express.static('Styles'));
app.use('/Images',express.static('Images'));
app.use('/Scripts',express.static('Scripts'));
app.use('/FontFamilys',express.static('FontFamilys'));




// Set The view Engine:-------------------------
app.set('view engine','hbs');
app.set('/views','./teachersLogin');
app.set('/views','./StudentRegistration');
app.set('/views','./Counselling');
app.set('/views','./HomePages');

// Home PageS[Start]---------------------------------------------

app.get('/',(req,resp)=>{
    // resp.send('<h1>home1 page!</h1>');
    resp.render('HomePages/home');
})
app.get('/TeacherPage',(req,reps)=>{
    resp.render('HomePages/teachersHomePage');
})



// Home PageS[End]---------------------------------------------


// Teachers Login And Sign Up [Start]------------------------

app.get('/SignIn',(req,res)=>{
    res.render('teachersLogin/signIn');
})
app.get('/LogIn',(req,res)=>{
    res.render('teachersLogin/login');
})

// teachers login and signIn routes:-----------

const teacherSignIn = require('./Routes/TeacherSignIn');
app.use('/',teacherSignIn);

const teacherLogIn = require('./Routes/TeacherLogin');
app.use('/',teacherLogIn);


// Teachers Login And Sign Up [End]------------------------



// Student Details:[Start]--------------------------------------------------------

app.get('/StuDetails',(req,res)=>{
    res.render('StudentRegistration/StudentRegistrationForm');
})

const StuDetails = require('./Routes/StudentDetails');
app.use('/',StuDetails);


// Profile Searching: ------------------------------
const studentDB =require('./Module/StuRegData');

app.get('/ProfileSearch',(req,reps)=>{
    reps.render('StudentRegistration/ProfileSearch');
});
app.post('/Profiles',async (req,res)=>{
    const items = await studentDB.find({branch:req.body.branch,year:req.body.year});
    res.render('StudentRegistration/showStudentDetails', { items });
})

// Profile Search According to there Gender and Category:
app.get('/ProfileSearchGn',(req,reps)=>{
    reps.render('StudentRegistration/ProfileSearchGn');
});
app.post('/ProfilesGn',async (req,res)=>{
    const items = await studentDB.find({branch:req.body.branch,year:req.body.year,gender:req.body.gender,category:req.body.category});
    if(items){
        res.render('StudentRegistration/showStudentDetails', { items });
    }
})

// Show All Register Students----------------------------

app.get('/showStudentDetails', async (req, res) => {
    const items = await studentDB.find({}).sort({ "rollNumber":1});
    res.render('StudentRegistration/showStudentDetails', { items });
});


// Student Details:[End]---------------------------------------------------------


// Counselling [Start]-------------------------------------------------------------

const counsellingSt = require('./Routes/CounsellingDB');
app.use('/',counsellingSt);
app.get('/counsellingForm',(req,resp)=>{
    resp.render('Counselling/counsellingForm');
})


// Show Counselling Student Application:---------------------------
const counsellingDB =require('./Module/CounsellingDB');
app.get('/showCounselling', async (req, resp) => {
    const items = await counsellingDB.find({}).sort({ "jeep":1});
    resp.render('Counselling/showCounselling', { items });
});


app.get('/studentSelection', async (req, resp) => {
    const items = await counsellingDB.find({}).sort({ "jeep":1});
    resp.render('Counselling/studentSelection', { items });
});

// app.post('')

app.get('/firstChoice',(req,reps)=>{
    reps.render('Counselling/firstChoice');
});
app.post('/firstChoiceSt',async (req,res)=>{
    const items= await counsellingDB.find({firstChoice:req.body.firstChoice, year:req.body.year}).sort({ "jeep":1});
    res.render('Counselling/showCounselling',{items});
})
app.get('/branchDisGn',(req,reps)=>{
    reps.render('Counselling/branchDisGn');
});
app.post('/branchGn',async (req,res)=>{
    const items= await counsellingDB.find({firstChoice:req.body.firstChoice, year:req.body.year , gender:req.body.gender,category:req.body.category,}).sort({ "jeep":1});
    res.render('Counselling/showCounselling',{items});
})



// Counselling [End]-------------------------------------------------------------


// app.use('/',(req,res)=>{
//     res.status(500).send('Internal Server Error!');
//     res.status(500).json('Internal Server Error!');
// })
app.listen(port,()=>{
    console.log(`working on port number ${port}`);
})
