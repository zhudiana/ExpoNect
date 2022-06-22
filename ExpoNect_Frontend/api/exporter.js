import axios from "axios";

const exporter = axios.create({
  baseURL: "http://172.20.10.2/:8000/api/v1",
});

export default exporter;
