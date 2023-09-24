const express = require('express');
const connection  = require('./database/database');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const brandRoutes = require('./routes/brandRoutes')
const carRoutes = require('./routes/carRoutes')
const cors = require('cors')
const app = express();

app.use(express.json())
dotenv.config()
app.use(cors({
    origin:['https://carwale.shop','https://carwale.vercel.app']
}))

connection();

app.use(express.static('uploads/'));

app.use('/api/user',userRoutes);
app.use('/api/brand',brandRoutes);
app.use('/api/car',carRoutes);

app.listen(process.env.PORT,() => {
    console.log('Car Running on port 5000');
})