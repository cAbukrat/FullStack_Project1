const mongoose = require('mongoose')

const connectDB = () => {
    mongoose
      .connect('mongodb://127.0.0.1:27017/subscriptionsDB')
      .then(() => console.log('Connected to subscriptionsDB!'))
      .catch((error) => console.log(error));
  };
  
  module.exports = connectDB;