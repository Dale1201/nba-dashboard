import axios from "axios";
//http://127.0.0.1:8000/nbaapp
//https://nba-service-2ts5y.ondigitalocean.app/nbaapp
export default class ApiService {
  static initialise() {
    this.api = axios.create({
      baseURL: "https://nba-service-2ts5y.ondigitalocean.app/nbaapp",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET PUT POST DELETE",
      },
    });
  }

  static get(resource, config) {
    return this.api.get(resource, config);
  }

  static put(resource, data, config) {
    return this.api.put(resource, data, config);
  }

  static patch(resource, data, config) {
    return this.api.patch(resource, data, config);
  }

  static post(resource, data, config) {
    this.ensureInitialised();
    return this.api.post(resource, data, config);
  }

  static delete(resource) {
    return this.api.delete(resource);
  }
}
