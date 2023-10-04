import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors());  

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phoneNumber: String,
  address: String
});
const User = mongoose.model('User', userSchema, 'users'); // Specifying 'users' collection explicitly

app.post('/signup', async (req, res) => {
  try {
    const { email, password, fullname, phoneNumber, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({ email, password: hashedPassword, fullname, phoneNumber, address})
    const token = jwt.sign({ email }, JWT_SECRET);
    res.status(200).json({ token, userId: createdUser._id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email }, JWT_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
