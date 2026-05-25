import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const fixBugAPI = (data) => API.post("/fix", data);

export const uploadFileAPI = (formData) =>
  API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const uploadRepositoryAPI = (formData) =>
  API.post("/upload-repository", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const runAgentTaskAPI = (data) => API.post("/agent-task", data);

export default API;
