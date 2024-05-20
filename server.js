const express = require('express');
const app = express();
const  bcrypt = require('bcrypt');
const ExcelJS = require('exceljs');
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

const counselling12DB = require('./Routes/counselling12DB');
app.use('/',counselling12DB);

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






// Selection router-1---------------------------------------

// const selectedStudent = require('./Routes/selectedStudent');
// app.use('/',selectedStudent);

// Selection router-2---------------------------------------



// Selection end------------------------------------------------////////////////////


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


// Counselling Excel File Download Router:---------------------------------



const User = require('./Module/CounsellingDB');
app.get('/export-counselling', async (req, res) => {
    try {
      const users = await User.find().lean().sort({'jeep':1});
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Users');
  
      // Add column headers
      worksheet.columns = [
        { header: 'Jeep Rank', key: 'jeep', width: 5 },
        { header: 'Student Name', key: 'studentName', width: 25 },
        { header: 'Father Name', key: 'fatherName', width: 25 },
        { header: 'Mother Name', key: 'motherName', width: 25 },
        { header: 'DOB', key: 'dob', width: 12},
        { header: 'First Choice', key: 'firstChoice', width: 15 },
        { header: 'Second Choice', key: 'secondChoice', width: 15 },
        { header: 'Third Choice', key: 'thirdChoice', width: 15 },
        { header: 'Fourth Choice', key: 'fourthChoice', width: 15 },
        { header: 'Year', key: 'year', width: 6 },
        { header: 'Gender', key: 'gender', width: 16 },
        { header: 'category', key: 'category', width: 12 },
        { header: 'Mobile Number', key: 'mobileNumber', width: 14 },
        { header: 'Email', key: 'email', width: 50 },
        { header: 'Aadhar Number', key: 'adharNumber', width: 15 },
        { header: 'State', key: 'state', width: 20 },
        { header: 'District', key: 'district', width: 24 },
        { header: 'Pincode', key: 'pincode', width: 8 },
      ];
  
      // Add rows
      worksheet.addRows(users);
  
      // Set the response header to indicate a file attachment
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'Counselling.xlsx'
      );
  
      await workbook.xlsx.write(res);
      res.status(200).end();
      
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while exporting the data');
    }
  });

app.get('/export-counselling12', async (req, res) => {
    try {
      const users = await User.find().lean().sort({'jeep':1});
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Users');
  
      // Add column headers
      worksheet.columns = [
          { header: '10 %', key: 'class10', width: 6 },
        { header: '12 %', key: 'class12', width: 6 },
        { header: 'Student Name', key: 'studentName', width: 25 },
        { header: 'Father Name', key: 'fatherName', width: 25 },
        { header: 'Mother Name', key: 'motherName', width: 25 },
        { header: 'DOB', key: 'dob', width: 12},
        { header: 'First Choice', key: 'firstChoice', width: 15 },
        { header: 'Second Choice', key: 'secondChoice', width: 15 },
        { header: 'Third Choice', key: 'thirdChoice', width: 15 },
        { header: 'Fourth Choice', key: 'fourthChoice', width: 15 },
        { header: 'Year', key: 'year', width: 6 },
        { header: 'Gender', key: 'gender', width: 16 },
        { header: 'category', key: 'category', width: 12 },
        { header: 'Mobile Number', key: 'mobileNumber', width: 14 },
        { header: 'Email', key: 'email', width: 50 },
        { header: 'Aadhar Number', key: 'adharNumber', width: 15 },
        { header: 'State', key: 'state', width: 20 },
        { header: 'District', key: 'district', width: 24 },
        { header: 'Pincode', key: 'pincode', width: 8 },
      ];
  
      // Add rows
      worksheet.addRows(users);
  
      // Set the response header to indicate a file attachment
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'Counselling.xlsx'
      );
  
      await workbook.xlsx.write(res);
      res.status(200).end();
      
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while exporting the data');
    }
  });

  

// Counselling [End]-------------------------------------------------------------


// app.use('/',(req,res)=>{
//     res.status(500).send('Internal Server Error!');
//     res.status(500).json('Internal Server Error!');
// })




app.listen(port,()=>{
    console.log(`working on port number ${port}`);
})
