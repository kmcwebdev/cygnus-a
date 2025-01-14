import { env } from "@/env.mjs";
import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_ARTEMIS_BASEAPI_URL,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // For example, you can set the auth token here if it's needed for every request

    // const token = localStorage.getItem("authToken");

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login or refresh the token
    }

    return Promise.reject(error);
  },
);

export default apiClient;
