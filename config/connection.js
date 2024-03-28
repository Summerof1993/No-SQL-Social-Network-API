// require mongoose
const mongoose = require ("mongoose");

// wrap mongoose around local connection to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/SocialNetworkDB')

// export connection
module.exports = mongoose.connection;