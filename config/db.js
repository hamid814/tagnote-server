const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.gray.underline);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
