const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError')

// const globalErrorHandler = require('./controllers/errorController')

const studentRouter = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes')


const app = express();

// 1) MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());


// 3) ROUTES
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/classes',classRoutes )


app.all('*', (req, res, next) => {
  next(new AppError(`cant't found ${req.originalUrl} on this server`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
