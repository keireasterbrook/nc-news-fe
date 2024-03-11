import axios from "axios";

const newsApi = axios.create({
    baseURL: 'https://nc-news-dknn.onrender.com/api/'
  });
  
export default newsApi;