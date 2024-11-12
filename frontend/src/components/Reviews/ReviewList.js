import { Suspense } from 'react'
import React, { useEffect, useState } from 'react'
import { getMovieReviews, deleteMovieReview, fetchMovies } from '../../Api/api'
import ReactStars from 'react-rating-stars-component'
import { format } from 'date-fns';

const ReviewList = ({ movieId, onReviewAdded, setEditingReview }) => {
  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState({})

  const handleEditClick = (review) => {
    setEditingReview(review)
  }

  const deleteReview = async (movieId, reviewId) => {
    await deleteMovieReview(movieId, reviewId)
    fetchMovies()
    const reviewsData = await getMovieReviews(movieId)
    setReviews(reviewsData)
  }

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getMovieReviews(movieId)
      const userName = localStorage.getItem('user')
      if (reviewsData) {
        setReviews(reviewsData)
      } else {
        setReviews([])
      }
      if (userName) {
        const user = JSON.parse(userName)
        console.log(user.role)
        setUser(user)
      }
    }
    fetchReviews()
  }, [movieId, onReviewAdded])

  return (
    <div className="">
      <h3 className="text-rose-800 bg-gradient-to-r w-fit max-w-[180px] mx-auto my-4 p-2">
        Yorumlar <i className='pi pi-comments text-yellow-400'></i>
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
              <div className='text-center'>
              <p className='w-fit mx-auto items-end justify-end'>{format(review.review_date,'dd/MM/yyyy')}</p>
              <p className='w-fit mx-auto items-end justify-end'>{format(review.review_date,'HH:mm')}</p>
              </div>
              <div className="btn-gruop mt-2">
                {review.user.username === user.username ? (
                  <button
                    onClick={() => handleEditClick(review)}
                    className="btn btn-outline-dark mb-2 mx-2"
                  >
                    Düzenle
                  </button>
                ) : (
                  ''
                )}
                {user.role === 'admin' ||
                review.user.username === user.username ? (
                  <button
                    onClick={() => {
                      deleteReview(movieId, review._id)
                    }}
                    className="btn btn-outline-danger mb-2"
                  >
                    Sil
                  </button>
                ) : (
                  ''
                )}
              </div>
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
