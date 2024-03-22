import axios from "axios";

const idApi = axios.create({
  baseURL: "https://data.nba.net/prod/v1/2023/players.json",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET PUT POST DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

// axios.get(url).then(response => {
//     console.log(response.data);
// })

export default class NbaIdApi {
  static idApi = axios.create({
    baseURL: "https://data.nba.net",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET PUT POST DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

  static initialise() {
    this.idApi = axios.create({
      baseURL: "https://data.nba.net",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET PUT POST DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  static ensureInitialised() {
    if (!this.idApi) {
      this.initialise();
    }
  }

  static async getPlayers() {
    this.ensureInitialised();
    const response = await this.idApi.get("/prod/v1/2023/players.json");
    console.log(response.data);
    return response.data;
  }
}
