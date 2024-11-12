import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReviewForm from '../Reviews/ReviewForm'
import ReviewList from '../Reviews/ReviewList'
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import { Autoplay, Navigation,Pagination, EffectCoverflow, Virtual } from 'swiper/modules';
import BgImage from '../../images/bg.jpeg'
import { fetchMovieById, getMovieReviews } from '../../Api/api'

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [editingReview, setEditingReview] = useState(null)
  const [reviewsUpdated, setReviewsUpdated] = useState(false)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetchMovieById(id)
      setMovie(response.data)
      const reviewsData = await getMovieReviews(id)
      setReviews(reviewsData)
    }
    fetchReviews()
  }, [id, reviewsUpdated])

  useEffect(() => {
    const loadMovie = async () => {
      const response = await fetchMovieById(id)
      setMovie(response.data)
    }
    loadMovie()
  }, [id])

  const handleReviewAdded = () => {
    setReviewsUpdated((prev) => !prev) 
  }

  if (!movie) return <div>Loading...</div>

  return (
    <div className="movie-detail text-center">
      <h2 className="select-none rounded-full mx-auto px-4 py-1 w-fit bg-gradient-to-l from-orange-800 to-black font-extrabold underline text-slate-100">
        {movie.title}
      </h2>
      <img
        className=" select-none w-fit mx-auto my-5 rounded-xl hover:shadow-xl hover:shadow-black h-[600px] z-10 mt-10"
        src={movie.poster_url}
        alt={movie.title}
      />
      <p className="w-fit mx-auto text-xl text-white px-3 bg-slate-700 rounded-full p-1">
        <strong className=" text-orange-500">Genre:</strong>{' '}
        {movie.genre.join(', ')}
      </p>
      <p className="w-fit mx-auto text-xl text-white px-3 bg-slate-700 rounded-full p-1">
        <strong className=" text-teal-500">Release Date:</strong>{' '}
        {movie.release_date}
      </p>
      <div className="block bg-gradient-to-b px-3 rounded-xl shadow-lg shadow-white select-none from-slate-500 to-slate-800 w-2/3 mx-auto text-xl text-white">
        <p>{movie.plot}</p>
      </div>
      <div className='my-5'>
        <h2 className='text-blue-700'>Görseller <i className='pi pi-images text-blue-700'></i></h2>
 <Swiper
 className=''
      spaceBetween={10}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 30 },
        768: { slidesPerView: 2, spaceBetween: 40 },
        1024: { slidesPerView: 3, spaceBetween: 50 },
      }}
      modules={[Autoplay]}
      autoHeight={false}
      height={500}
      autoplay={{
        delay: 400,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      pagination={{ clickable: true }}
      >
      {movie.images.map((cas, index) => (
        <SwiperSlide key={index} className="select-none h-auto">
          <div
            className="flex flex-col items-center p-2 bg-gradient-to-r from-slate-400 to-violet-500 rounded-lg shadow-md"
          >
            <img src={cas} alt={cas} className="object-cover h-full rounded-lg" />
        
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>     
     
      <div className='h-fit'>
        <hr/>
    <h2 className='text-lime-700'>Film Ekibi <i className='pi pi-video text-green-700'></i></h2>
      <Swiper
      spaceBetween={10}
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 30 },
        768: { slidesPerView: 4, spaceBetween: 40 },
        1024: { slidesPerView: 6, spaceBetween: 50 },
      }}
      modules={[Autoplay]}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      pagination={{ clickable: true }}
      >
      {movie.cast.map((cas, index) => (
        <SwiperSlide key={index} className="select-none">
          <div
            className="flex flex-col items-center w-[150px] h-full p-2 bg-gradient-to-b from-violet-400 to-gray-500 rounded-lg shadow-md"
          >
            <img src={cas.profile_path} alt={cas.name} className=" object-fill h-[150px] w-[150px] rounded-full mb-2" />
            <div className="text-sm font-semibold">{cas.name}</div>
            <div className="text-xs text-gray-600">{cas.character}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
      </div>
        
      <div className='h-fit'>
        <hr/>
    <h2 className='text-yellow-700'>Yapım Ekibi <i className='pi pi-palette text-yellow-800'></i></h2>
      <Swiper
      spaceBetween={10}
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 30 },
        768: { slidesPerView: 4, spaceBetween: 40 },
        1024: { slidesPerView: 6, spaceBetween: 50 },
      }}
      modules={[Autoplay]}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      pagination={{ clickable: true }}
      >
      {movie.crew.map((crw, index) => (
        <SwiperSlide key={index} className="select-none">
          <div
            className="flex flex-col items-center w-[150px] h-full p-2 bg-gradient-to-b from-violet-400 to-gray-500 rounded-lg shadow-md"
          >
            <img src={crw.profile_path} alt={crw.name} className=" object-fill h-[180px] w-[150px] rounded-full mb-2" />
            <div className="text-sm font-semibold">{crw.name}</div>
            <div className="text-xs text-gray-600"><span className='text-gray-800 mx-1'>Job:</span>{crw.job}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    <hr/>
      </div>
      <h2 className='text-slate-700'>Düşüncelerini Paylaş <i className='pi pi-comment text-yellow-300'></i></h2>
      <ReviewForm
        movieId={movie._id}
        review={editingReview}
        onReviewAdded={handleReviewAdded}
      />
      <ReviewList
        setEditingReview={setEditingReview}
        movieId={movie._id}
        onReviewAdded={handleReviewAdded}
      />
    </div>
  )
}

export default MovieDetail
