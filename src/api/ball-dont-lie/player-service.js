import ApiService from "../api-service";

const START_YEAR = 2020;
const CURRENT_YEAR = 2023;
export default class PlayerService {
  static async getPlayers(searchTerm, perPage = 25, page = 0) {
    if (!searchTerm) {
      const response = await ApiService.get(`players?page=${page}&per_page=${perPage}`);
      return response.data.data;
    }
    const response = await ApiService.get(`players?search=${searchTerm}&page=${page}&per_page=${perPage}`);

    return response.data.data;
  }

  static async getPlayer(id) {
    const response = await ApiService.get(`players/${id}`);
    return response.data;
  }

  static async getPlayerSeasonAverages(playerId) {
    const results = [];

    for (let i = START_YEAR; i <= CURRENT_YEAR; i++) {
      const response = await ApiService.get(`season_averages?season=${i}&player_ids[]=${playerId}`);
      if (response.data.data.length > 0) {
        results.push(response.data.data[0]);
      }
    }
    return results.reverse();
  }
}
