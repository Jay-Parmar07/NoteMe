const mongoose = require('mongoose');

const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected: ${conn.connection.host}`);

    } catch (error) {

        console.error(`Error : ${error.message}`);
        console.error(error);
        // Avoid exiting the process here so the server can stay up for debugging
        // process.exit(1);

    }
};

module.exports = connectDB;