import mongoose from 'mongoose'

const dbUri='mongodb+srv://priyanshu:priyanshu1234@cluster0.svwgo43.mongodb.net/book_db?retryWrites=true&w=majority'

mongoose.set('strictQuery',false)
const connectDb=()=>{
    return mongoose.connect(dbUri)
}

export default connectDb;
