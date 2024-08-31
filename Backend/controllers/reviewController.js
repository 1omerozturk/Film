const Review = require('../models/review')
const Movie = require('../models/movie')
const User = require('../models/user')
const req = require('express/lib/request')

exports.createReview = async (req, res) => {
  try {
    const { movieId } = req.params
    const { userId, rating, comment } = req.body

    //console.log("Gelen userId:", userId); // Debugging için

    const review = new Review({
      movie_id: movieId,
      user: userId,
      rating,
      comment,
    })
    const movie = await Movie.findById(movieId)

    if (!movie) return res.status(404).send({ message: 'Film Bulunamadı.' })

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' })

    movie.reviews.push(review)
    await review.save()
    await movie.save()

    res.status(201).json(review)
  } catch (error) {
    console.error('Hata:', error) // Debugging için
    res.status(500).json({ message: 'Yorum eklenirken bir hata oluştu', error })
  }
}

exports.deleteMovieReview=async(req,res)=>{
  try{
    const {movieId,reviewId}=req.params;
    const review=await Movie.findById(movieId).populate({
      path:'reviews',
      match:{_id:reviewId}
      
    });
    if(!review)return res.status(404).json({message:'Yorum bulunamadı'})
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({message:'Yorum silindi'})
    }catch(error){
      console.error('Hata:',error);

  }
}
exports.updateReview=async(req,res)=>{
  try{
    const {reviewId}=req.params;
    const {rating,comment}=req.body;
    const review=await Review.findById(reviewId);
    if(!review)return res.status(404).json({message:'Yorum bulunamadı'})
      review.rating=rating;
    review.comment=comment;
    await review.save();
    res.status(200).json(review);
}
catch(err){
  console.error("Yorum güncelleme hatası",err)

  }
}

exports.getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params
    const movie = await Movie.findById(movieId).populate(
        {
            path:'reviews',
            populate:{
                path:'user',
                select:'username role',
            }
        }
        )
    console.log(movie.reviews)
    // movie checked
    if (!movie) return res.status(404).json({ message: 'Film bulunamadı.' })

    if (movie.reviews.length === 0)
      return res.status(404).json({ message: 'Bu film için yorum bulunamadı.' })

    res.json(movie.reviews);
  } catch (error) {
    console.error('Yorumları getirme hatası: ', error)
    res.status(500).json({ message: 'Yorumları getirirken bir hata oluştu' })
  }
}

exports.getUser=async (req,res)=>{
    try{
        const {userId}=req.params
        const user=await User.findById(userId);
        res.json(user);
    }
    catch(err){
        console.error(err,"Kullanıcı bulunamadı.");
        
    }
}