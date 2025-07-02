import axios from "axios";
import { Base_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: Base_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "pplication/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (reponse) => {
        return response;
    },
    (error) => {
        // Handle common errorsglobally
        if(error.reponse) {
            if(error.reponse.status === 401) {
                // Redirect to login page
                window.location.href = "/login";
            } else if (error.reponse.status === 500) {
                console.error("Server error.Please try again later.");
            }
        } else if (error.code == "ECONNABORATED") {
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;