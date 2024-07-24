const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const Hospital = require('./models/Hospital'); 
const User = require('./models/User'); 

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/Hospitals';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Sign up route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, contact } = req.body;

  // Basic validation
  if (!name || !email || !password || !contact) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({name, email, password: hashedPassword, contact });
    const savedUser = await newUser.save();

    // Respond with the saved user
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ error: 'Error signing up. Please try again.' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
      console.log('user');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    res.json({ user });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Server error');
  }
});

// Middleware to verify token (no longer needed)
// const authenticate = (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   jwt.verify(token, jwtSecret, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Token is not valid' });
//     req.user = decoded;
//     next();
//   });
// };

// Define a route to add a new hospital
app.post('/api/hospitals', upload.single('image'), async (req, res) => {
  const { name, city, speciality, noOfDoctors, noOfDepartments, description } = req.body;
  const image = req.file ? req.file.path : null; // 'path' contains the path where multer has stored the image
  try {
    const newHospital = new Hospital({ name, city, speciality, noOfDoctors, noOfDepartments, description, image });
    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (err) {
    console.error('Error saving hospital:', err);
    res.status(500).send('Server error');
  }
});

// Define a route to get the list of hospitals
app.get('/api/hospitals', async (req, res) => {
  try {
    const { city } = req.query;
    let query = {};
    if (city) {
      query.city = city;
    }
    const hospitals = await Hospital.find(query);
    res.json(hospitals);
  } catch (err) {
    console.error('Error fetching hospitals:', err);
    res.status(500).send('Server error');
  }
});

// Define a route to delete a hospital by ID
app.delete('/api/hospitals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHospital = await Hospital.findByIdAndDelete(id);
    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    console.error('Error deleting hospital:', error);
    res.status(500).json({ error: 'Error deleting hospital' });
  }
});

// Define a route to update a hospital by ID
app.put('/api/hospitals/:id', upload.single('image'), async (req, res) => {
  const hospitalId = req.params.id;
  const { name, city, speciality, noOfDoctors, noOfDepartments, description } = req.body;

  try {
    let updatedHospital = await Hospital.findById(hospitalId);

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    updatedHospital.name = name;
    updatedHospital.city = city;
    updatedHospital.speciality = speciality;
    updatedHospital.noOfDoctors = noOfDoctors;
    updatedHospital.noOfDepartments = noOfDepartments;
    updatedHospital.description = description;

    // Handle image update if a new image file is uploaded
    if (req.file) {
      updatedHospital.image = req.file.path; // save the path to the uploaded image
    }

    await updatedHospital.save();

    res.status(200).json(updatedHospital); // respond with updated hospital object
  } catch (error) {
    console.error('Error updating hospital:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define a route to get the list of cities
app.get('/api/cities', async (req, res) => {
  try {
    const cities = await Hospital.distinct('city');
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


