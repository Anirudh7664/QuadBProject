const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const URL ='mongodb+srv://randevanirudh:AnirudhMongo@cluster0.dif22ba.mongodb.net/web?retryWrites=true&w=majority&appName=Cluster0';
mongoose.set('strictQuery', true)
const connectToMongo = async () => {
    try {
        let db = await mongoose.connect(URL)
        console.log(db.connection.host);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;