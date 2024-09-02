import mongoose from 'mongoose'

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connecting to mongo db ....${conn.connection.host}`);
    }
    catch(error){
        console.log(` Error in mOngoDb ${error}`)
    }

}

export default connectDB;

// export default connectDB;

// import mongoose from 'mongoose';

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true, // Legacy options, optional but recommended for backward compatibility
//             useUnifiedTopology: true, // Legacy options, optional but recommended for backward compatibility
//             connectTimeoutMS: 10000, // Optional: timeout for initial connection
//             serverSelectionTimeoutMS: 5000 // Optional: timeout for server selection
//         });
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error connecting to MongoDB: ${error.message}`);
//         process.exit(1); // Exit the process with failure
//     }
// };

// export default connectDB;

