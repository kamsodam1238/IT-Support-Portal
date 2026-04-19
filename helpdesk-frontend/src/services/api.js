// Use environment variable if available, otherwise fall back to local backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||"http://localhost:8080/api";

export default API_BASE_URL;