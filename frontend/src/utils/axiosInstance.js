// axiosInstance;.ts
import axios, { AxiosError } from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // replace with your API base URL
  timeout: 10000, // request timeout in ms
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // pass through successful responses
  (error ) => {
    if (error.response) {

        const {data,status} = error.response;
      // Server responded with a status code outside 2xx
      console.error("Error Response:", error.response.data);
      console.error("Status:", error.response.status);

      switch (status) {
        case 400:
          console.erro("Bad Request. Please check your input.",data);
          break;
        case 401:
          console.erro("Unauthorized. Please log in again.",data);
          // Optionally redirect to login
          break;
        case 403:
          console.erro("Forbidden. You don’t have permission.",data);
          break;
        case 404:
          console.erro("Resource not found.",data);
          break;
        case 500:
          console.erro("Server error. Please try again later.",data);
          break;
        default:
          console.erro("An unexpected error occurred.",data);
      }
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
    } else {
      // Something else happened
      console.error("Error setting up request:", error.message);
    }

    // Reject the promise so calling code can handle it if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;