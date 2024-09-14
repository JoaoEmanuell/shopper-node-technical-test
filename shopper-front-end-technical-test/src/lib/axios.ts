import { Axios } from "axios";

let baseURL;
let windowUrl = "";

try {
  windowUrl = window.location.origin;
} catch (err) {}

// define the url for api

if (windowUrl.includes("8080"))
  baseURL = windowUrl.replaceAll("8080", "3000"); // dev mode
else baseURL = `${windowUrl}:3000`; // prod mode

export const axios = new Axios({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
