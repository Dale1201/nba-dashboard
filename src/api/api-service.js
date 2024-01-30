import axios from "axios";

export default class ApiService {
  static initialise() {
    this.api = axios.create({
      baseURL: "https://www.balldontlie.io/api/v1/",
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
