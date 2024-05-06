import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://randomuser.me",
});

export default axiosApi;
