const mongo = require('mongoose');
mongo.connect('mongodb://0.0.0.0:27017/CollegeDB')

const destinationSchema = new mongo.Schema({
    studentName:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    motherName:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    jeep:{
        type:Number,
        required:true
    },
    firstChoice:{
        type:String,
        required:true
    },
    secondChoice:{
        type:String,
        required:true
    },
    thirdChoice:{
        type:String,
        required:true
    },
    fourthChoice:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    year:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    branch: { 
        type: String,
         required: false
    },
});

const DestinationModel = mongo.model('SelectedStudents', destinationSchema);
module.exports = DestinationModel;


// const collection= mongoose.model('SelectedStudents', schema, 'counselling');
// module.exports = collection;