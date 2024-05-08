const express = require('express');
const router = express.Router();
const  bcrypt = require('bcrypt');
const studentDB =require('../Module/StuRegData');


router.post('/StudentDetails', async (req,res)=>{
    const data = {
        rollNumber:req.body.rollNumber,
        studentName:req.body.studentName,
        fatherName:req.body.fatherName,
        motherName:req.body.motherName,
        dob:req.body.dob,
        mobileNumber:req.body.mobileNumber,
        adharNumber:req.body.adharNumber,
        email:req.body.email,
        branch:req.body.branch,
        year:req.body.year,
        gender:req.body.gender,
        category:req.body.category,
    }
   
    await studentDB.insertMany([data]);

    res.render('HomePages/home');
});

module.exports = router;
