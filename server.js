// Import statements
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { User } from './models/UserModel.js';
import { CreateProduct } from './controllers/CreateProduct.js';
import { filProduct, GetProduct, GetProducts } from './controllers/GetProducts.js';
import { login, signUp } from './controllers/UserController.js';
import { delProduct } from './controllers/DelProduct.js';
import { createOrder } from './controllers/CreateOrder.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use(express.urlencoded({ extended: true }));


//db.js
// mongoose.connect('mongodb://localhost:27017',{
//     dbName:"Water",
// }).then(()=>{
//     console.log('db connected')
// }).catch((err)=>{
//     console.log('err in connection to db:',err)
// })

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.dbUrl);
        console.log('DB connected');
    } catch (error) {
        console.log('Error in DB connection:', error);
    }
};

app.post('/create', CreateProduct);
app.get('/get', GetProducts);
app.get('/get/:id', GetProduct);
app.post('/signup', signUp);
app.get('/login', login);
app.get('/filter', filProduct);
app.delete('/delete/:id', delProduct);
app.post('/sendOrder', createOrder);

app.get('/', (req, res) => {
    res.send('hey there');
});

// Disabling caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Start server and connect to DB
app.listen(8080, '0.0.0.0', async () => {
    await connectDb();
    console.log('Server started on port 8080');
});