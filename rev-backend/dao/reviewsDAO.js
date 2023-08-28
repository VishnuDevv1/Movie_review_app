import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  movieId: Number ,
  user: String,
  review:String
})

export default mongoose.model('review', reviewSchema);