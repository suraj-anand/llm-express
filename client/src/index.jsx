import { createRoot } from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import "react-toastify/dist/ReactToastify.css"

// Axios config
import axios from 'axios'
const BASE_URL = import.meta.env?.VITE_BASE_URL;
if(BASE_URL){
    axios.defaults.baseURL = BASE_URL;
}
axios.defaults.withCredentials = true;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
