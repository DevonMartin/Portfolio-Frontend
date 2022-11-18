import developing from "./Developing";
import axios from "axios";

let URL = developing
  ? process.env.REACT_APP_SERVER_URL
  : "https://devonmartin-api.onrender.com";

export default class MyAPI {
  static async get(reqURI, reqData) {
    let response = await axios.get(URL + reqURI, reqData);
    return response;
  }

  static async post(reqURI, reqData) {
    let response = await axios.post(URL + reqURI, reqData);
    return response;
  }

  static async put(reqURI, reqData) {
    let response = await axios.put(URL + reqURI, reqData);
    return response.data;
  }
}
