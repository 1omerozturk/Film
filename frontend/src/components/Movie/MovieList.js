import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovies, addWatchList,getWathcList,fetchMovieById } from '../../api/api'
import { CiCalendarDate, CiStar } from 'react-icons/ci'
import showToast from '../Alert/ShowToast'
import allGenres from '../Genre'

import Loading from '../Loading/Loading'

import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import { Autoplay, Navigation,Pagination, EffectCoverflow, Virtual } from 'swiper/modules';


const MovieList = ({ searchTerm, filter, filterDate, sortBy, isOpenSlider }) => {
  const [movies, setMovies] = useState([])
  const [filterGenre,setFilterGenre]=useState('')
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [watchList, setWatchList] = useState([]);

  useEffect(()=>{
    
  },[isOpenSlider])
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    setUser(user)
  },[watchList])
  const handleOnClick = (movie) => {
    if (user.length !== 0) {
      addWatchList(user._id, movie._id)
      showToast(`${movie.title} İzleme lisesine eklendi.`, 'success')
    }
  }

  useEffect(() => {
    if (user && user._id) {
      const fetchAllWatchLists = async (ids) => {
        try {
          const watchListArray = await Promise.all(
            ids.map(async (id) => {
              const response = await fetchMovieById(id);
              return response.data; // Sadece data kısmını döndürüyoruz
            })
          );
          setWatchList(watchListArray); // Tüm filmleri setWatchList'e aktarıyoruz
          
        } catch (error) {
          console.log('Watchlist verileri çekilirken hata: ', error);
        }
       
      };
  
      const loadWatchList = async () => {
        try {
          const response = await getWathcList(user._id);
          const watchListArray = response?.watchList || []; // Null kontrolü
          if (watchListArray.length > 0) {
            await fetchAllWatchLists(watchListArray);
          }
        } catch (error) {
          console.log("Watchlist yüklenirken hata:", error);
        }
        finally {
          setLoading(false);
        }
      };
  
      loadWatchList();
    }
  }, [user]);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await fetchMovies()

      setMovies(response.data)
      if (localStorage.getItem('token')) {
        const userName = localStorage.getItem('user')
        if (userName) {
          const user = JSON.parse(userName)
          setUser(user)
        }
      }
    }
    loadMovies()
    setLoading(false)
  }, [])

  useEffect(() => {
    if (searchTerm !== '') {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredMovies(filtered)
    } else if (filter !== '' && filter !== 'Tür' && filterDate !== '') {
      const filtered = movies.filter(
        (movie) =>
          movie.genre.some((e) =>
            e?.toLowerCase().includes(filter?.toLowerCase()),
          ) && movie.release_date === filterDate,
      )
      setFilteredMovies(filtered)
    } else if (filter !== '' && filter !== 'Tür') {
      const filtered = movies.filter((movie) =>
        movie.genre.some((e) =>
          e?.toLowerCase().includes(filter?.toLowerCase()),
        ),
      )
      setFilteredMovies(filtered)
    } else if (filterDate !== '') {
      const filtered = movies.filter(
        (movie) => movie.release_date.toString() === filterDate.toString(),
      )
      setFilteredMovies(filtered)
    } else if (sortBy !== '') {
      let sortedMovies = [...movies]
      switch (sortBy) {
        case 'popularityAsc':
          sortedMovies.sort((a, b) => a.rating - b.rating)
          break
        case 'popularityDesc':
          sortedMovies.sort((a, b) => b.rating - a.rating)
          break
        case 'nameAsc':
          sortedMovies.sort((a, b) => a.title.localeCompare(b.title))
          break

        case 'nameDesc':
          sortedMovies.sort((a, b) => b.title.localeCompare(a.title))
          break
        case 'dateAsc':
          sortedMovies.sort((a, b) => a.release_date - b.release_date)
          break
        case 'dateDesc':
          sortedMovies.sort((a, b) => b.release_date - a.release_date)
          break
        default:
          break
      }
      setFilteredMovies(sortedMovies)
    } else {
      setFilteredMovies(movies)
    }
  }, [searchTerm, movies, filter, sortBy, filterDate])



  if (!loading && filteredMovies && filteredMovies.length>0)
      return (
//     <div>
//     {/* allgenres swipper */}
//     <div className={`${!isOpenSlider?'hidden':''}  mx-20 px-10 cursor-pointer rounded-full bg-transparent text-center`}>
//       <Swiper
//       spaceBetween={100}
//       loop={true}
//       slidesPerView={6}
//       modules={[Autoplay]}
//       autoplay={{
//         delay:1000,
//         disableOnInteraction: false,
//       }}
//       pagination={{
//         clickable: true,
//       }}
//       >
//         {allGenres.map((genre, index) => (
//           <SwiperSlide key={index}
//           >
//               <div
//               onClick={()=>setFilterGenre(genre)}
//               className="w-fit h-fit border-2 rounded-lg p-1 border-black genre-swiper-slide-title font-bold italic text-center text-indigo-800"
//               >{genre.split(' ').length>1?genre.split(' ')[0] +' .'+genre.split(' ')[1][0]:genre}</div>
//           </SwiperSlide>
//         ))
//       }
//       </Swiper>
//     </div>


//           <hr className={`${!isOpenSlider?'hidden':''}  border-8 opacity-20 mx-20 border-black rounded-xl mt-5`}/>
//     <div
//       className={`${!isOpenSlider?'hidden':''}  mx-20 py-2 px-10   drop-shadow-xl`}
//     > 
//  <Swiper
//       effect={'coverflow'}
//       coverflowEffect={{
//         rotate: 50,
//         stretch: 0,
//         depth: 100,
//         modifier: 1,
//         slideShadows: true,
//       }}
//       autoplay={{
//         delay: 3000,
//         disableOnInteraction: false,
//       }}
//       pagination={{
//         clickable: true,
//       }}
//       navigation={true}
//       modules={[Autoplay,EffectCoverflow, Navigation,Virtual]}
//       autoHeight={false}
//       spaceBetween={50}
//       slidesPerView={3}
//       onSlideChange={() => console.log('slide change')}
//       onSwiper={(swiper) => console.log(swiper)}
//     >
//       {movies.map((movie)=>
//       (
//         <SwiperSlide title={movie.title}
                
//         className='justify-center sm:px-2 md:px-4 lg:px-12 h-fit  text-center' key={movie._id}>
//           <Link  to={`/movie/${movie._id}`}>
//           <div className="bg-black text-center">
//             <img height={'100%'} className='hover:shadow-xl hover:shadow-black delay-200 duration-300 hover:ease-in-out'  src={movie.poster_url} alt={movie.title} />
//           </div>
//           </Link>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//     </div>
<div>
  {/* allgenres Swiper */}
  <div className={`${!isOpenSlider ? 'hidden' : ''} mx-4 sm:mx-10 md:mx-20 px-4 sm:px-8 md:px-10 cursor-pointer rounded-full bg-transparent text-center`}>
    <Swiper
      spaceBetween={20}
      loop={true}
      slidesPerView={2} // Mobilde 2, büyük ekranlarda ise aşağıda artırılacak
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
      pagination={{ clickable: true }}
    >
      {allGenres.map((genre, index) => (
        <SwiperSlide key={index}>
          <div
            onClick={() => setFilterGenre(genre)}
            className="w-fit h-fit border-2 rounded-lg p-1 border-black genre-swiper-slide-title font-bold italic text-center text-indigo-800"
          >
            {genre.split(' ').length > 1 ? genre.split(' ')[0] + ' .' + genre.split(' ')[1][0] : genre}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  <hr className={`${!isOpenSlider ? 'hidden' : ''} border-8 opacity-20 mx-4 sm:mx-10 md:mx-20 border-black rounded-xl mt-5`} />

  <div className={`${!isOpenSlider ? 'hidden' : ''} mx-4 sm:mx-10 md:mx-20 py-2 px-4 sm:px-8 md:px-10 drop-shadow-xl`}>
    <Swiper
      effect="coverflow"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, EffectCoverflow, Navigation, Virtual]}
      autoHeight={false}
      spaceBetween={20} // Mobilde daha az boşluk
      slidesPerView={1} // Mobilde tek slide
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 30 },
        768: { slidesPerView: 3, spaceBetween: 40 },
        1024: { slidesPerView: 3, spaceBetween: 50 },
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {movies.map((movie) => (
        <SwiperSlide title={movie.title} className="justify-center sm:px-2 md:px-4 lg:px-12 h-fit text-center" key={movie._id}>
          <Link to={`/movie/${movie._id}`}>
            <div className="bg-black text-center">
              <img
                className="hover:shadow-xl hover:shadow-black delay-200 duration-300 hover:ease-in-out w-full h-auto"
                src={movie.poster_url}
                alt={movie.title}
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
   
    <hr className={`${!isOpenSlider?'hidden':''} border-8 opacity-20 mx-20 border-black rounded-xl`}/>
        <div className="mx-5 h-full movie-list grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
          {filteredMovies
            ? filteredMovies.map((movie) => (
                <div
                  title={movie.title}
                  key={movie._id}
                  className="movie-item relative"
                >
                  <div
                    title={movie.release_date}
                    className="grid absolute bg-slate-400 hover:bg-black hover:text-white bg-opacity-60 text-center items-end p-1 rounded-full right-0 w-fit"
                  >
                    <CiCalendarDate
                      className="text-white hover:rotate-180  after:rotate-180 hover:transition-transform hover:duration-700 duration-500 rounded-full items-center"
                      size={30}
                    />
                    <b className="text-white">{movie.release_date}</b>
                  </div>
                  {movie.rating ? '' : (movie.rating = 5)}
                  {movie.rating ? (
                    <div
                      title={movie.rating?.toFixed(1)}
                      className="grid absolute text-center items-end rounded-full bg-black  p-1 w-fit"
                    >
                      <CiStar
                        className="bg-amber-500 rounded-full hover:rotate-180 transition-transform delay-100 duration-500 text-white"
                        size={30}
                      />
                      <b className="text-amber-500">{movie?.rating?.toFixed(1)}</b>
                    </div>
                  ) : (
                    ''
                  )}
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/movie/${movie._id}`}
                  >
                    <img
                      className="h-[500px] rounded-lg  hover:shadow-lg hover:transition-shadow delay-50  duration-500 hover:shadow-black w-full"
                      src={movie.poster_url}
                      alt={movie.title}
                    />
                  </Link>
                  {/* 
            Türleri sıralama ve yazdırmak
    */}
    
                  <div className="text-center">
                    <div
                      title={movie.genre}
                      className="text-center p-1 rounded-full  w-full mx-auto font-bold"
                    >
                      <input
                        type="text"
                        placeholder="Tür"
                        value={movie.genre.join(', ')}
                        readOnly
                        className="w-full text-center px-4 py-2 border font-semibold border-gray-300 rounded-md  bg-gradient-to-t from-indigo-300 via-sky-300
                        to-indigo-500 "
                      />
                    </div>
                  </div>
                  
                  <div
                    
                    className={`text-center relative cursor-pointer ${
                      user? '' : 'collapse pointer-events-none'
                    } text-black`}
                  >
                    {watchList.some(movieObj => movieObj._id === movie._id) ? (
                  <button
                  className="w-fit mx-auto hover:ease-in hover:duration-300  text-sm  font-semibold border-2 border-sky-800 rounded-xl px-2 py-1.5  justify-between"
                  title="İzleme listesinde mevcut"
                    >
                    <i className="pi pi-check text-green-600 border-1 border-green-600 p-1.5 rounded-lg text-md font-bold  mx-2"
                    ></i>
                    <span className="text-sm font-bold">İzleme listenizde Mevcut</span>
                   </button>
                    ):
                    
                    ( <button
                      onClick={() => handleOnClick(movie)}
                      className="w-fit mx-auto hover:ease-in hover:duration-300 hover:bg-black hover:text-white text-sm  font-semibold border-2 border-sky-800 rounded-xl px-2 py-1.5  justify-between"
                      title='İzleme listesine ekle'
                    >
                      <i className=" pi pi-plus text-sky-500 border-1  p-1.5 rounded-lg text-md font-bold hover:bg-white hover:text-indigo-500 hover:rotate-90 hover:transition-transform hover:duration-700 mx-2"></i>
                    <span className="text-sm font-bold">İzleme Listesine Ekle</span>
                    </button>)
                  }
                  </div>
    
                  <div className="mt-1 text-xl rounded-2xl p-2  text-center bg-gradient-to-l to-blue-400 from-slate-900 text-white ">
                    {movie.title.length > 20
                      ? `${movie.title.substring(0, 20)}...`
                      : movie.title}
                  </div>
                </div>
              ))
            : movies.map((movie) => (
                <div
                  key={movie._id}
                  className="movie-item hover:drop-shadow-xl hover:shadow-black"
                >
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/movie/${movie._id}`}
                  >
                    <img
                      className="h-[500px] rounded-lg shadow-sm shadow-blue-800 w-full"
                      src={movie.poster_url}
                      alt={movie.title}
                    />
                  </Link>
                  {user? (
                    <div
                      title="İzleme listesine ekle"
                      className={`text-center relative cursor-pointer ${
                        user.length>0 ? '' : ' collapse pointer-events-none'
                      } text-black`}
                    >
                          {watchList.some(movieObj => movieObj._id === movie._id) ? (
                  <button
                  className="w-fit mx-auto hover:ease-in hover:duration-300  text-sm  font-semibold border-2 border-sky-800 rounded-xl px-2 py-1.5  justify-between"
                  title="İzleme listesinde mevcut"
                    >
                    <i className="pi pi-check text-green-600 border-1 border-green-600 p-1.5 rounded-lg text-md font-bold  mx-2"
                    ></i>
                    <span className="text-sm font-bold">İzleme listenizde Mevcut</span>
                   </button>
                    ):
                    
                    ( <button
                      onClick={() => handleOnClick(movie)}
                      className="w-fit mx-auto hover:ease-in hover:duration-300 hover:bg-black hover:text-white text-sm  font-semibold border-2 border-sky-800 rounded-xl px-2 py-1.5  justify-between"
                      title='İzleme listesine ekle'
                    >
                      <i className=" pi pi-plus text-sky-500 border-1  p-1.5 rounded-lg text-md font-bold hover:bg-white hover:text-indigo-500 hover:rotate-90 hover:transition-transform hover:duration-700 mx-2"></i>
                    <span className="text-sm font-bold">İzleme Listesine Ekle</span>
                    </button>)
}
                    </div>
                  ) : (
                    ''
                  )}
                  <h3 className="mt-1 rounded-2xl p-2 text-center bg-gradient-to-l to-blue-400 from-slate-900 text-white ">
                    {movie.title}
                  </h3>
                </div>
              ))}
        </div>
        </div>
      )
      else if(filteredMovies.length===0 && movies.length>0){
        return <div className="flex justify-center items-center h-screen">No Movies Found</div>
      }
    else{

      return (
        <Loading/>
      )
    }
  
 
}
export default MovieList
