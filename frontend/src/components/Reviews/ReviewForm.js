import React, { useEffect, useState } from 'react'
import { createReview, fetchMovies, getMovieReviews, updateReview } from '../../Api/api'
import ReactStars from 'react-rating-stars-component'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ReviewForm = ({ movieId,onReviewAdded,review }) => {
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([])
 const history=useHistory();

useEffect(()=>{
  if(review){
  setComment(review.comment);
  setRating(review.rating);
  }
},[review]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = JSON.parse(localStorage.getItem('user')) // Kullanıcı bilgilerini alın
      if (!user) {
        alert('Yorum yapmak için giriş yapmalısınız!')
        return history.push("/login");
      }
      const reviewData = {
        userId: user._id,
        rating,
        comment,
      }
      if(review){
        await updateReview(review._id,reviewData);
      }
      else{

        await createReview(movieId, reviewData)
      }
      const response=await getMovieReviews(movieId)
      setReviews(response)
      onReviewAdded();
      setRating(1)
      setComment('')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form
      className="bg-slate-500 w-1/2 rounded-xl mx-auto grid grid-cols-1 text-white"
      onSubmit={handleSubmit}
    >
      <div className=" py-3 grid grid-cols-1">
        <label className="font-bold px-2 text-xl" htmlFor="rating">
          Rating <span className="text-yellow-300">1-10</span>
        </label>
        <ReactStars
          classNames="mx-auto"
          value={rating}
          count={10}
          size={30}
          emptyIcon={<i className="far fa-star"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
          onChange={(rating) => setRating(rating)}
        />
      </div>
      <div className="grid grid-cols-1">
        <label className='font-bold text-xl mb-1' htmlFor="comment">Comment</label>
        <textarea
        rows={5}
          id="comment"
          value={comment}
          className="p-2 h-auto text-slate-700 font-bold mx-3 rounded-xl"
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      
      <button
      className="text-slate-800 hover:bg-sky-600 border-solid border-2 border-sky-500 p-1 hover:shadow-sm hover:drop-shadow-xl rounded-xl bg-sky-400 hover:text-white w-fit mx-auto my-2 font-semibold" type="submit">
        {review?'Güncelle':'Yorum Ekle'}
      </button>
    </form>
  )
}
export default ReviewForm
