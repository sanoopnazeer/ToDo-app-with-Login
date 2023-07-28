const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection');
const dotenv = require('dotenv')
const noteRoutes = require('./routes/noteRoutes')
const cookieparser = require('cookie-parser')

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieparser())

app.use('/', noteRoutes)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server started running on PORT ${PORT}`)
})