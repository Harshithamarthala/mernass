var express = require('express'); //npm install express 
var cors = require('cors'); //npm instal cors 
var MongoClient = require('mongodb').MongoClient; //npm install mongodb 
var app = express(); 
app.use(express.json()); 
app.use(cors({ 
origin:"*", 
methods:["GET","POST","PUT","DELETE"] 
})); 
// set port, listen for requests 
const PORT = process.env.PORT || 4002; 
app.listen(PORT, () => { 
console.log(`Server is running on port ${PORT}.`); 
}); 
// Default Route 
app.get('/', function (req, res) { 
res.send('<h1>Hello World!</h1>'); 
}) 
const MONGODB_URI = 'mongodb://localhost:27017/student'; 

 
//Get All'student Records 
// http://localhost:8080/studnets 
app.get('/class', async (req, res) => { 
try { 
// Connect to MongoDB 
const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: 
true }); 
// Access the database 
const db = client.db(); 
// Get the collection 
const collection = db.collection('student'); 
// Fetch all records 
const records = await collection.find({}).toArray(); 
// Close the connection 
client.close(); 
// Send the records as JSON response 
res.json(records); 
} catch (err) { 
console.error(err); 
res.status(500).send('Internal Server Error'); 
} 
}); 
// Get'student Record By Roll No. 
// http://localhost:8080'student/2211CS010363 
app.get('student/:RollNo', async (req, res) => { 
try { 
// Connect to MongoDB 
const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: 
true }); 
// Access the database 
const db = client.db(); 
// Get the collection 
const collection = db.collection('student'); 
// Fetch the record by ID 
const RollNo= req.paramsRollNo; 
const record = await collection.findOne({ RollNo:RollNo}); 
// Close the connection 
client.close(); 
// If no record found, send 404 response 
if (!record) { 
 
return res.status(404).json({ error: 'student not found' +studentId}); 
} 
// Send the record as JSON response 
res.json(record); 
} catch (err) { 
console.error(err); 
res.status(500).send('Internal Server Error'); 
} 
}); 
// Get'student Record By Roll No. using Post Method 
// http://localhost:8080/GetStudentDetailsByRollNo 
app.post('/GetstudentDetailsByRollNo', async (req, res) => { 
try { 
// Connect to MongoDB 
const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: 
true }); 
// Access the database 
const db = client.db(); 
// Get the collection 
const collection = db.collection('student'); 
// Fetch the record by ID 
constRollNo= req.body.RollNo; 
const record = await collection.findOne({ RollNo:RollNo}); 
// Close the connection 
client.close(); 
// If no record found, send 404 response 
if (!record) { 
return res.status(404).json({ error: 'student not found' +RollNo}); 
} 
// Send the record as JSON response 
res.json(record); 
} catch (err) { 
console.error(err); 
res.status(500).send('Internal Server Error'); 
} 
}); 
 
// Add'student Record 
// http://localhost:8080/AddStudent 
app.post('/Addstudent', async (req, res) => { 
try { 
const {RollNo, Name } = req.body; 
// Connect to MongoDB Server 
const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: 
true }); 
console.log("Connected correctly to server"); 
// Access the database 
const db = client.db(); 
// Get the collection 
const collection = db.collection('student'); 
// Insert a single document 
const result = await collection.insertOne({ RollNo:RollNo, Name: Name }); 
// Close the connection 
client.close(); 
res.send('student added successfully'); 
} catch (error) { 
console.error('Error adding student:', error); 
res.status(500).send('Error adding student'); 
} 
}); 
// Update'student Name by their RollNo 
// http://localhost:8080/Updatestudent/2211CS010363 
app.put('/Updatestudent/:RollNo', async (req, res) => { 
try { 
// Connect to MongoDB Server 
const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: 
true }); 
console.log("Connected correctly to server"); 
// Access the database 
const db = client.db(); 
// Get the id of the'student to update 
const RollNo= req.paramsRollNo; 
// Extract the updated fields from the request body 
const { Name } = req.body; 
// Update the'student document 
const result = await db.collection('student').updateOne( 
{ RollNo:RollNo}, 
{ $set: { Name: Name } } 
); 
 
// Check if the document was updated 
if (result.modifiedCount === 1) { 
res.status(200).json({ message: 'student updated successfully' }); 
} else { 
res.status(404).json({ message: 'student not found' }); 
} 
// Close the connection 
client.close(); 
} catch (err) { 
console.log(err.stack); 
res.status(500).json({ message: 'Internal server error' }); 
} 
}); 
// Delete'student Record 
// http://localhost:8080/DeleteStudent 
app.delete('/Deletestudent/:RollNo', async (req, res) => { 
try { 
// Connect to MongoDB Server 
const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: 
true }); 
console.log("Connected correctly to server"); 
// Access the database 
const db = client.db(); 
// Get the roll number of the'student to delete 
const RollNo= req.paramsRollNo; 
// Delete the'student document 
const result = await db.collection('student').deleteOne({ RollNo:RollNo}); 
// Check if the document was deleted 
if (result.deletedCount === 1) { 
res.status(200).json({ message: 'student Record Deleted successfully' }); 
} else { 
res.status(404).json({ message: 'student not found' }); 
} 
// Close the connection 
client.close(); 
} catch (error) { 
console.error('Error deletingstudent:', error); 
res.status(500).json({ message: 'Internal server error' }); 
} 
});