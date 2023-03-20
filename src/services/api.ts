import axios from "axios";

export const api = axios.create({
  baseURL: "http://www.poatransporte.com.br/php/facades",
});
