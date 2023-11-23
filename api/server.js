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

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phoneNumber: String,
  address: String
});

const User = mongoose.model('User', userSchema, 'users'); 

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_id: String,
  weighted_rating: Number,
  product_name: String,
  category: String,
  discounted_price: String, // Note: Consider using Number if possible
  actual_price: String,    // Note: Consider using Number if possible
  discount_percentage: String, // Note: Consider using Number if possible
  rating: Number,
  rating_count: String,    // Note: Consider using Number if possible
  about_product: String,
  user_id: String,         // Note: Consider using an array of strings if multiple user IDs
  user_name: String,       // Note: Consider using an array of strings if multiple user names
  review_id: String,       // Note: Consider using an array of strings if multiple review IDs
  review_title: String,    // Note: Consider using an array of strings if multiple review titles
  review_content: String,  // Note: Consider using an array of strings if multiple review contents
  img_link: String,
  product_link: String
});
const Product = mongoose.model('Product', productSchema, 'products');

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

app.get('/products', async (req, res) => {
  console.log('GET /products');
  const limit = 20; // Number of products per page
  const page = req.query.page || 1; // Current page number
  try {
    const products = await Product.find()
      .sort({ weighted_rating: -1 }) // Sort by weighted_rating in descending order
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(3000, () => console.log(`Server is running on port 3000`));
