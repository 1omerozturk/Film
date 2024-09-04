const mongoose = require('mongoose')


const CastSchema=new mongoose.Schema({
  name:String,
  character:String,
  profile_path:String
})


const CrewSchema = new mongoose.Schema({
  name:String,
  job: String, // Örneğin 'Director', 'Producer' vb.
  profile_path: String // Ekip üyesinin profil fotoğrafı için URL (opsiyonel)
});


const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  original_title: String,
  category: { type: String,required:true },
  genre: [String],
  director: String,
  release_date:{type:Number, min:[1500],max:[2024]},
  duration: Number,
  language: String,
  country: String,
  plot: String,
  poster_url: String,
  video_url: String,
  rating: Number,
  reviews:[{type:mongoose.Schema.Types.ObjectId,ref:'Review'}],
  cast:[CastSchema],
  crew:[CrewSchema]
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
