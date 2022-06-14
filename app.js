const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError')
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean")

const globalErrorHandler = require('./controllers/errorController')

const studentRouter = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes');
const courseRoutes = require('./routes/courseRoutes');
const stageRoutes = require('./routes/stageRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const transactionRoutes = require('./routes/transactionRoutes')
const voucherRoutes = require("./routes/voucherRoutes");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes")
const markRoutes = require("./routes/markRoutes");
const periodRoutes = require("./routes/periodRoutes");
const classGroupRoutes = require("./routes/classGroupRoutes");
const feeChargeRoutes = require("./routes/feeChargeRoutes");
const examChargeRoutes = require("./routes/examChargeRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes");
const companyInfoRoutes = require("./routes/companyInfoRoutes")


const app = express();

// 1) MIDDLEWARES

// Set security HTTP Headers
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));


// Data sanitization against NoSQl query injection
app.use(mongoSanitize());

// Data sanitization agins xss
app.use(xss())

// 3) ROUTES
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/classes', classRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/stages', stageRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/vouchers', voucherRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/marks', markRoutes);
app.use('/api/v1/periods', periodRoutes);
app.use('/api/v1/classGroups', classGroupRoutes);
app.use("/api/v1/feeCharges", feeChargeRoutes);
app.use("/api/v1/examCharges", examChargeRoutes);
app.use('/api/v1/dashboard', dashboardRoutes)
app.use('/api/v1/companyInfo', companyInfoRoutes)


app.all('*', (req, res, next) => {
  next(new AppError(`cant't found ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
