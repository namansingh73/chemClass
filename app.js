const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');

// Start express app
const app = express();

app.enable('trust proxy');

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('*', (req, res) =>
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// );

module.exports = app;
