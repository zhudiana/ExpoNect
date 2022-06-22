import axios from "axios";

const importer = axios.create({
  baseURL: "http://172.20.10.2/:8000/api/v1",
});

export default importer;
