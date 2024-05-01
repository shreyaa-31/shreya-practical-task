const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes/route');
const adminRoutes = require('./admin/adminRoute');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB connected");
        app.use('/', routes)
        app.use('/admin', adminRoutes)

        app.listen(8001, () => {
            console.log("Server is running on http://localhost:8001");
        });
    })
    .catch(err => console.error("MongoDB connection failed:", err));




