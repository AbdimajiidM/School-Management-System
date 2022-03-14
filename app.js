const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError')

const globalErrorHandler = require('./controllers/errorController')

const studentRouter = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes');
const courseRoutes = require('./routes/courseRoutes');
const stageRoutes = require('./routes/stageRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const transactionRoutes = require('./routes/transactionRoutes')
const studentChargeRoutes = require('./routes/studentChargeRoutes');

const app = express();

// 1) MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());


// 3) ROUTES
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/classes',classRoutes );
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/stages', stageRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/studnetCharges', studentChargeRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`cant't found ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
