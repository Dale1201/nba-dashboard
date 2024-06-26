import ApiService from "../api-service";

export default class PlayerService {
  static async getPlayers() {
    try {
      const response = await ApiService.get(`all-players/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching players", error);
    }
  }

  static async getPlayerInfo(id) {
    const response = await ApiService.get(`player-info/${id}`);
    return response.data;
  }

  static async getPlayerSeasonStats(playerId) {
    const response = await ApiService.get(`player-career-stats/${playerId}`);
    return response.data.reverse();
  }
  static async getPlayerPlayoffStats(playerId) {
    const response = await ApiService.get(`player-career-stats/${playerId}`, {
      params: { playoffs: true },
    });

    return response.data.reverse();
  }
}
