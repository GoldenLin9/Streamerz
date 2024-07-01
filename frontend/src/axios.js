import axios from 'axios';

const baseURL = "http://localhost:8000/api/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem("access_token") ? "JWT " + localStorage.getItem("access_token"): null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
});


axiosInstance.interceptors.response.use(

    response => {
        return response
    }, async function(error) {

        const originalRequest = error.config;

        if (error.response.status === 401) {
            console.log("refreshing token")
            try {
                const response = await axiosInstance.post('token/refresh/', {
                    refresh: localStorage.getItem('refresh_token')
                });

                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                error.config.__isRetryRequest = true;
                error.config.headers['Authorization'] = 'JWT ' + response.data.access;

                return axiosInstance(originalRequest);

            } catch (e) {
                console.log(e)
            }
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;