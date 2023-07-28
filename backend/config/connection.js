const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connection.connections[0].host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;