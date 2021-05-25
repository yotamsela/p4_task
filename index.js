require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
}

mongoose.connect(
    process.env.DB_CONNECTION_STRING,options,
    () => console.log('connected to MongoDB')
);

// middleware
app.use(express.json());

// routes
const auth_routes = require('./routes/auth.route')
const data_routes = require('./routes/data.route')
app.use('/', auth_routes);
app.use('/data/', data_routes);

app.listen(3000, () => console.log('server is running.'));

