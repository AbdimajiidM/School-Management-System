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
const voucherRoutes = require("./routes/voucherRoutes")
const chargeScheduleRoutes = require('./routes/chargeScheduleRoutes');
const userRoutes = require("./routes/userRoutes");
const markRoutes = require("./routes/markRoutes");
const periodRoutes = require("./routes/periodRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

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
app.use('/api/v1/vouchers', voucherRoutes);
app.use('/api/v1/chargesSchedule', chargeScheduleRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/marks', markRoutes);
app.use('/api/v1/periods', periodRoutes),
app.use('/api/v1/dashboard', dashboardRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`cant't found ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
