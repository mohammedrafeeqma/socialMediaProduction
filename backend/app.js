const express = require('express')
const app = express()
const createError = require('http-errors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin')
const postRoute = require('./routes/posts')
const conversationRoute = require('./routes/conversation')
const messageRoute = require('./routes/message')
const eventRoute = require('./routes/events')
const notificationRoute = require('./routes/notification')

dotenv.config()
 
// mongoose.connect('mongodb://localhost:27017/socialMedia', {useNewUrlParser: true},()=>{
//     console.log("mongoose connected");
// })
mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("mongoDB connected");
})

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json()) // it is a body parser when you make post request it parse
app.use(helmet())
app.use(morgan('common'))

app.use('/api/user' , userRoute)
app.use('/api/auth', authRoute)
app.use('/api/admin', adminRoute)
app.use('/api/post', postRoute)
app.use('/api/conversation', conversationRoute)
app.use('/api/message', messageRoute)
app.use('/api/event/', eventRoute)
app.use('/api/notification',notificationRoute)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });


app.use(function(err, req, res, next) {
    
  
    // render the error page
    console.log("error consoling");
    res.status(500);
    res.json('error');
  });

app.listen(3001,()=>{
    console.log(`Server is running`);
})