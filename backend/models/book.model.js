import mongoose from 'mongoose'

const Book = mongoose.model('Book', {
        title: { type: String,required: [true, "Please add title"] },
        author: { type: String, required: [true, "Please enter a author"] },
        publishYear: { type: String, required: [true, "Please enter the publishYear"] },
}
)

export default Book;
