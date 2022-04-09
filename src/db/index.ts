import 'dotenv/config';
import mongoose from 'mongoose'

const connectToDatabase = async () => {
    try {
        let url = process.env.MONGODB_URI || "";
        const db = await mongoose.connect(url, {});
        console.log("MongoDB connected to", db.connection.host);
    } catch (err) {
        console.log(err);
    }
}
export { connectToDatabase }