import ApiService from "../api-service";

export default class PlayerService {
  static async getPlayers(season = "2023-24") {
    try {
      const response = await ApiService.get(`all-players/${season}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching players", error);
    }
  }

  static async getPlayerInfo(id) {
    const response = await ApiService.get(`player-info/${id}`);
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
