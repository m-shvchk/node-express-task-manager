const mongoose = require("mongoose");

  const connectDB = (url) => {
    mongoose
    .connect(url, { // second argument to connect is not needed in Mongoose V6
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
  }

  module.exports = connectDB
