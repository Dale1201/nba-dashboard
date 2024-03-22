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
    return response.data[0];
  }

  static async getPlayerSeasonStats(playerId) {
    const response = await ApiService.get(`player-career-stats/${playerId}`);
    return response.data.reverse();
  }
}
