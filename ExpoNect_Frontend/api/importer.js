import axios from "axios";

const importer = axios.create({
  baseURL: "http://192.168.100.6/:8000/api/v1",
});

export default importer;
