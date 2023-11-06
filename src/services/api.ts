import axios from "axios"

const api = axios.create({
  baseURL: "https://doceria-server.onrender.com/"
});

export default api; 