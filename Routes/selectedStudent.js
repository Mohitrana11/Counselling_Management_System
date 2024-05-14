const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const SourceModel = require('../Module/CounsellingDB');
const DestinationModel = require('../Module/selectedStudentsDB');

const router = express.Router();
// const port = 3000;

// router.use(bodyParser.json());

// Replace 'sourceDbUri' and 'destinationDbUri' with your actual MongoDB URIs
// const sourceDbUri = 'mongodb://0.0.0.0:27017/CollegeDB';
// const destinationDbUri = 'mongodb://0.0.0.0:27017/CollegeDB';

// mongoose.connect(sourceDbUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const destinationDb = mongoose.createConnection(destinationDbUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const Destination = destinationDb.model('Destination', DestinationModel.schema);
// const Destination = 'mongodb://0.0.0.0:27017/CollegeDB';

router.post('/selectedStudent', async (req, res) => {
    // const { _id, branch } = req.body;
   // const _id = await SourceModel.find({_id:req.body._id});

    try {
        const document = await SourceModel.findById(_id);
        if (!document) {
            return res.status(404).send('Document not found');
        }
        const newDocumentData = {
            jeep:document.jeep,
            studentName:document.studentName,
            fatherName:document.fatherName,
            motherName:document.motherName,
            dob:document.dob,
            mobileNumber:document.mobileNumber,
            email:document.email,
            firstChoice:document.firstChoice,
            secondChoice:document.secondChoice,
            thirdChoice:document.thirdChoice,
            fourthChoice:document.fourthChoice,
            year:document.year,
            gender:document.gender,
            category:document.category,
            state:document.state,
            district:document.district,
            pincode:document.pincode,
            branch:req.body.branch
        };


        // const newDocument = new Destination(newDocumentData);
        // await newDocument.save();


        await DestinationModel.save([newDocumentData]);
        await SourceModel.findByIdAndDelete(_id);

        res.send('Document transferred and original removed successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error transferring document');
    }
});

module.exports = router;





// router.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

















// const express = require('express');

// const SourceModel = require('../Module/CounsellingDB');
// const DestinationModel = require('../Module/selectedStudentsDB');

// const router = express();

// // MongoDB URIs
// const sourceDbUri = 'mongodb://0.0.0.0:27017/CollegeDB';
// const destinationDbUri = 'mongodb://0.0.0.0:27017/CollegeDB';

// mongoose.connect(sourceDbUri, { useNewUrlParser: true, useUnifiedTopology: true });
// const destinationDb = mongoose.createConnection(destinationDbUri, { useNewUrlParser: true, useUnifiedTopology: true });

// const Destination = destinationDb.model('selectedStudents', DestinationModel.schema);

// router.post('/selectedStudent', async (req, res) => {
//     const { _id, branch } = req.body;

//     try {
//         const document = await SourceModel.findById(_id);

//         if (!document) {
//             return res.status(404).send('Document not found');
//         }

//         const newDoc = new Destination({
//             jeep:req.body.jeep,
//             studentName:req.body.studentName,
//             fatherName:req.body.fatherName,
//             motherName:req.body.motherName,
//             dob:req.body.dob,
//             mobileNumber:req.body.mobileNumber,
//             email:req.body.email,
//             firstChoice:req.body.firstChoice,
//             secondChoice:req.body.  secondChoice,
//             thirdChoice:req.body.thirdChoice,
//             fourthChoice:req.body. fourthChoice,
//             year:req.body.year,
//             gender:req.body.gender,
//             category:req.body.category,
//             state:req.body.state,
//             district:req.body.district,
//             pincode:req.body.pincode,
//             branch:req.body.branch
//         });

//         await newDoc.save();  // Save in destination database
//         await SourceModel.findByIdAndRemove(_id);  // Remove from source database

//         res.send('Document transferred successfully');
//     } catch (err) {
//         console.error('Error during document transfer:', err);
//         res.status(500).send('Error transferring document');
//     }
// });

// router.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });







// const express = require('express');
// const { MongoClient } = require('mongodb');
// // const bodyParser = require('body-parser');

// const routes = express.Routes();
// // const port = 3000;

// // Middleware to parse JSON bodies
// // routes.use(bodyParser.json());

// // MongoDB connection details
// const sourceUri = 'mongodb://localhost:27017';
// const targetUri = 'mongodb://localhost:27018';
// const sourceDbName = 'sourceDatabase';
// const targetDbName = 'targetDatabase';
// const sourceCollectionName = 'sourceCollection';
// const targetCollectionName = 'targetCollection';

// // POST endpoint to transfer data
// routes.post('/transfer', async (req, res) => {
//     const { _id, extraAttribute } = req.body;  // Assuming the _id and an extra attribute are passed in the body
//     const sourceClient = new MongoClient(sourceUri);
//     const targetClient = new MongoClient(targetUri);

//     try {
//         await sourceClient.connect();
//         await targetClient.connect();
//         const sourceDb = sourceClient.db(sourceDbName);
//         const targetDb = targetClient.db(targetDbName);
//         const sourceCollection = sourceDb.collection(sourceCollectionName);
//         const targetCollection = targetDb.collection(targetCollectionName);

//         // Find the document in the source database
//         const document = await sourceCollection.findOne({ _id: new MongoClient.ObjectId(_id) });

//         if (!document) {
//             throw new Error("Document not found");
//         }

//         // Add the extra attribute to the document
//         document.extraAttribute = extraAttribute;

//         // Insert the document into the target database
//         await targetCollection.insertOne(document);

//         // Remove the document from the source database
//         await sourceCollection.deleteOne({ _id: document._id });

//         res.status(200).json({ message: 'Document transferred successfully.' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     } finally {
//         await sourceClient.close();
//         await targetClient.close();
//     }
// });

// routes.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
