import { Suspense } from 'react'
import React, { useEffect, useState } from 'react'
import { getMovieReviews,deleteMovieReview, fetchMovies } from '../../Api/api'
import ReactStars from 'react-rating-stars-component'

const ReviewList = ({ movieId,onReviewAdded }) => {
  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState({})
const [editingReview,setEditingReview]=useState([])

  const handleEditClick=async(review)=>{
    setEditingReview(review)
  }

  const deleteReview=async (movieId,reviewId)=>{
    try {
      await deleteMovieReview(movieId,reviewId);
      fetchMovies();
      const reviewsData=await getMovieReviews(movieId);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Yorum silme hatası",error)
    }
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getMovieReviews(movieId)
        const userName = localStorage.getItem('user')
        if (reviewsData) {
          setReviews(reviewsData)
        } else {
          setReviews([])
        }
        if (userName) {
          const user = JSON.parse(userName)
          setUser(user)
        }
      } catch (err) {
        console.error('Yorumları getirme hatası', err)
      }
    }
    fetchReviews();
  }, [movieId,onReviewAdded])

  return (
    
      <div className="">
        <h3 className="text-rose-800 bg-gradient-to-r w-fit max-w-[100px] mx-auto my-4 p-2">
          Yorumlar
        </h3>
        <div className="text-black bg-transparent w-1/2 px-1 mx-auto p-0.5 rounded-2xl grid grid-flow-row">
          {reviews ? (
            reviews.map((review) => (
              <div
                className="bg-gradient-to-b rounded-tl-[100px]  rounded-b-[100px] border-2 from-gray-400 to-slate-400 my-5 py-3"
                key={review._id}
              >
                <h4 className="font-semibold  underline rounded-lg border-1 w-fit px-2 mx-auto">
                  {review.user.username || 'Bilinmeyen'}
                </h4>
                <ReactStars
                  classNames="mx-auto"
                  value={review.rating}
                  edit={false}
                  count={10}
                  size={30}
                  emptyIcon={<i className="far fa-star"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#D7B50C"
                />
                <p className=" w-1/2 mx-auto p-2 border-black">
                  {review.comment}
                </p>
               
                {review.user.username === user.username ? (
                  <div className="btn-gruop mt-2">
                    <button 
                    onClick={()=>{handleEditClick(review)}}
                    className="btn btn-outline-dark mb-2 mx-2">
                      Düzenle
                    </button>
                    <button
                      onClick={() => {deleteReview(movieId,review._id)}}
                      className="btn btn-outline-danger mb-2"
                    >
                      Sil
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
  )
}

export default ReviewList
