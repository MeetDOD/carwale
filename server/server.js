const express = require('express');
const connection  = require('./database/database');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const brandRoutes = require('./routes/brandRoutes')
const carRoutes = require('./routes/carRoutes')
const cors = require('cors')
const app = express();

const allowedOrigins = [
    'https://carwale-frontend-k0g363vgf-meetdod.vercel.app',
    'https://carwale-frontend-git-main-meetdod.vercel.app',
    'https://carwale.shop',
    'https://carwale.vercel.app'  
];

const corsOptions = {
    origin: allowedOrigins,
};
  
app.use(cors(corsOptions));

app.use(express.json())
dotenv.config()

connection();

app.use(express.static('uploads/'));

app.use('/api/user',userRoutes);
app.use('/api/brand',brandRoutes);
app.use('/api/car',carRoutes);

app.listen(process.env.PORT,() => {
    console.log('Car Running on port 5000');
})
