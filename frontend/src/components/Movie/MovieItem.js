// MovieItem.js
import { Link } from 'react-router-dom';
import { CiCalendarDate, CiStar } from 'react-icons/ci';

const MovieItem = ({ movie }) => {
  if (!movie.rating) movie.rating = 5;

  return (
    <div
      title={movie.title.length}
      key={movie._id}
      className="movie-item hover:shadow-lg hover:transition-shadow delay-200 hover:shadow-black relative"
    >
      <div
        title={movie.release_date}
        className="grid absolute bg-slate-400 bg-opacity-60 text-center items-end p-1 rounded-full right-0 w-fit"
      >
        <CiCalendarDate
          className="text-white rounded-full items-center"
          size={30}
        />
        <b className="text-white">{movie.release_date}</b>
      </div>
      {movie.rating && (
        <div
          title={movie.rating?.toFixed(1)}
          className="grid absolute text-center items-end rounded-full bg-black  p-1 w-fit"
        >
          <CiStar
            className="bg-amber-500 rounded-full text-white"
            size={30}
          />
          <b className="text-amber-500">{movie?.rating?.toFixed(1)}</b>
        </div>
      )}
      <Link
        style={{ textDecoration: 'none' }}
        to={`/movie/${movie._id}`}
      >
        <img
          className="h-[500px] rounded-lg shadow-sm shadow-blue-800 w-full"
          src={movie.poster_url}
          alt={movie.title}
        />
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
              className="w-full text-center px-4 py-2 border font-semibold border-gray-300 rounded-md  bg-gradient-to-r from-slate-700 to-black "
            />
          </div>
        </div>
        <div className="mt-1 text-xl rounded-2xl p-2  text-center bg-gradient-to-l to-blue-400 from-slate-900 text-white ">
          {movie.title}
        </div>
      </Link>
    </div>
  );
};

export default MovieItem;