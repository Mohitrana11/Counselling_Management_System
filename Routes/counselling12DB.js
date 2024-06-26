const express = require('express');
const router = express.Router();
const counsellingDB =require('../Module/counselling12DB');



router.post('/CounsellingPercentage',async (req,resp)=>{
    const data = {
        class10:req.body.class10,
        class12:req.body.class12,
        studentName:req.body.studentName,
        fatherName:req.body.fatherName,
        motherName:req.body.motherName,
        dob:req.body.dob,
        mobileNumber:req.body.mobileNumber,
        email:req.body.email,
        firstChoice:req.body.firstChoice,
        secondChoice:req.body.  secondChoice,
        thirdChoice:req.body.thirdChoice,
        fourthChoice:req.body. fourthChoice,
        year:req.body.year,
        gender:req.body.gender,
        category:req.body.category,
        state:req.body.state,
        district:req.body.district,
        pincode:req.body.pincode,
    }
    await counsellingDB.insertMany([data]);
    // await counsellingDB.save([data]);
    resp.render('Counselling/counsellingSave');
})


module.exports = router;