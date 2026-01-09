const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());

// explicitly load server/.env
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connections = require('./config/dbconfig');

const userRoute = require('./routes/user.Route')
const productRoute = require('./routes/products.Routes')
const bidsRoute = require('./routes/bids.Routes')
const notificationRoute = require('./routes/notification.Routes')

const port = process.env.PORT || 8080;

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/bids', bidsRoute);
app.use('/api/notifications', notificationRoute);

// deployemnet configuration


__dirname=path.resolve();
// render deployment

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}

app.listen(port,()=> console.log(`listening on port number ${port}`));