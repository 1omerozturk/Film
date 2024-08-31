import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const fetchMovies = () => {
  return axios.get(`${API_URL}/movies`)
}

export const fetchMovieById = (id) => {
  return axios.get(`${API_URL}/movies/${id}`)
}

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/users/register`, userData)
}

export const deleteMovieById = (id) => {
  const token = localStorage.getItem('token')
  return axios.delete(`${API_URL}/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/users/login`, userData)
}

export const addMovie = async (movieData) => {
 
    const token = await localStorage.getItem('token')
    const response = await axios.post(`${API_URL}/movies`, movieData, {
      headers: {
        Authorization: `Bearer ${token}`, // Token'ı başlığa ekle
      },
    })
    console.log('Movie added successfully:', response.data)
    return response
 
}

const API_URL2 = 'http://localhost:5000/api';

// Yorumları Getir
export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL2}/movies/${movieId}/reviews`
      
      // Yorumlar herkes tarafından görülebilir olduğu  için tokene gerek yok 
      // const token = localStorage.getItem('token'); // Token'ı ayrı bir değişkene alın
      // , {
      // headers: {
      //   Authorization: `Bearer ${token}`, // Token'ı başlığa ekle
      // },
    // }
  
  );
    if(response.data.length>0)return response.data;
    else return "Yorum yok";
  } catch (error) {
    console.error(
      'Yorumlar getirilirken hata oluştu:',
      error.response ? error.response.data : error.message,
    );
  }
};

export const deleteMovieReview=async(movieId,reviewId)=>{
  try {
    const token=localStorage.getItem('token');
    const response=await axios.delete(`${API_URL2}/movies/${movieId}/reviews/${reviewId}`,
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      return response.data;
  } catch (error) {
    console.error('Yorum silinirken hata oluştu: ',
      error.response? error.response.data:error.message
    )
  }
}

export const getUser=async(userId)=>{
  try {
    const token=localStorage.getItem('token');
    const response=await axios.get(`${API_URL2}/movies/${userId}/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token'ı başlığa ekle
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Kullanıcı adı bulunamadı:',
      error.response? error.response.data:error.message,
    )
  }
}

// Yorum Ekle
export const createReview = async (movieId, reviewData) => {
  try {
    const token = localStorage.getItem('token'); // Token'ı ayrı bir değişkene alın
    const response = await axios.post(`${API_URL2}/movies/${movieId}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`, // Token'ı başlığa ekle
      },
    });
    console.log('Yorum eklendi:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Yorum eklenirken hata oluştu:',
      error.response ? error.response.data : error.message,
    );
  }
};

export const updateMovie = (id, movieData) => {
  const token = localStorage.getItem('token')
  return axios.put(`${API_URL}/movies/${id}`, movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const updateReview=(reviewId,reviewData)=>{
const token=localStorage.getItem('token')
return axios.put(`${API_URL2}/reviews/${reviewId}`,reviewData,{
  headers:{
    Authorization:`Bearer ${token}`,
},
})
}

export const logOut = () => {
  localStorage.removeItem('token')
  return (window.location.href = '/login')
}
