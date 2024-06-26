import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    // withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
});
export const fetchmenuitems = () => api.get('/api/menu/fetchcategory');
export const fetchAllCategoryData = () => api.get('/api/menu/fetchAllData?category=all');
export default api;