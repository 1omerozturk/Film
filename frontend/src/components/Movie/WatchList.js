import React, { useEffect, useState } from "react";
import { getWathcList, fetchMovieById, deleteWatchListById } from "../../Api/api";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import showToast from '../Alert/ShowToast'
import Loading from "../Loading/Loading";
const WatchList = () => {
  const [watchList, setWatchList] = useState([]); // watchList'i boş array olarak başlattık
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const userName = localStorage.getItem("user");
      if (userName) {
        const parsedUser = JSON.parse(userName);
        setUser(parsedUser);
      }
    }
  }, []); // Bu effect yalnızca bir kez çalışır
  

  const handleDeleteClick=async(movieObj)=>{
    const response=await deleteWatchListById(user?._id,movieObj._id)
    
    if(response.status===200){
      showToast(`${movieObj.title} izleme Listesinden kaldırıldı.`,'error')
      setWatchList(watchList.filter(item=>item._id!==movieObj._id))
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

  if (loading) {
    return (
        <Loading/>
      
    );
  }
  if (watchList.length === 0) {
    return (
      <div className="text-black text-center h-screen">
        İzleme Listeniz Boş
        <Link to="/" className="block text-blue-500 hover:underline mt-2">
          Anasayfa
        </Link>
      </div>
    );
  }

  return (
      <>
      <h1 className="text-center text-black font-extrabold font-mono">İzleme Listem</h1>
    <div className="w-auto flex justify-center items-center h-full">
      <ul
       className="justify-items-center md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-3 items-center"
       >
        {watchList.map((movieObj, index) => (
          <li 
          className="justify-center rounded-2xl text-center mb-0 pb-0 bg-gradient-to-b to-slate-300 text-white px-2 m-2 my-0 via-sky-400 from-black"
          key={movieObj._id} // movieObj.data yerine sadece movieObj kullanıyoruz çünkü response'dan sadece data kısmını aldık
          >
            <Link style={{ textDecoration: 'none' }} to={`/movie/${movieObj._id}`}>
              <div className="h-[80px] my-3 font-extrabold font-mono text-xl">
                {movieObj.title}
              </div>
              <img
                className="w-full aspect-[3/4] select-none mx-auto mb-4 rounded-xl hover:shadow-xl hover:shadow-blue-900 object-cover hover:transition hover:duration-700 hover:ease-linear"
                src={movieObj.poster_url}
                alt={movieObj.title}
                />
            </Link>
            <div className="btn-group gap-2 my-auto mb-4">
              <button
                onClick={()=>handleDeleteClick(movieObj)}
                className="w-fit text-lg mx-auto bg-rose-600 px-2 rounded-full transition duration-0 hover:text-rose-500 hover:transition hover:duration-1000 hover:ease-in-out hover:bg-white"
              >
                Kaldır
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
        </>
  );
};

export default WatchList;
