import axios from "axios";

const url = "https://d392hd1u5yd463.cloudfront.net/api";
// const url = "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (response) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTFlM2MxM2RkMzBiNWQ0ZTZlZjNiMyIsImlhdCI6MTcwODQ4MTQ1MCwiZXhwIjoxNzQwMDE3NDUwfQ._8QqiNW8q9EbfosOdKtxfxNCRhixhrRPiwG0vTsEN4Y";
    if (!token) {
      localStorage.removeItem("token");
    }
    response.headers.authorization = token ? `Bearer ${token}` : "";
    return response;
  },
  (error) => Promise.reject(error?.response)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
