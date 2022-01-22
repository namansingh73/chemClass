const express = require('express');
const morgan = require('morgan');
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

app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
