import ApiService from "../api-service";

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

  static async getPlayerSeasonAverages(playerId, startYear = 2020, currentYear = 2023) {
    const results = [];

    for (let i = startYear; i <= currentYear; i++) {
      const response = await ApiService.get(`season_averages?season=${i}&player_ids[]=${playerId}`);
      if (response.data.data.length > 0) {
        results.push(response.data.data[0]);
      }
    }
    return results.reverse();
  }
}
