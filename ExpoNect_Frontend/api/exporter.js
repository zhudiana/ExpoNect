import axios from "axios";

const exporter = axios.create({
  baseURL: "http://192.168.100.6/:8000/api/v1",
});

export default exporter;
