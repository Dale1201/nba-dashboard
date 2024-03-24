import ApiService from "../api-service";

export default class SeasonService {
  static perGameStatLeaderCache = new Map();

  static async getPerGameStatLeaders(stat, perGame = false) {
    if (this.perGameStatLeaderCache.has(stat)) {
      if (perGame) {
        return this.perGameStatLeaderCache.get(stat).perGame;
      }
      return this.perGameStatLeaderCache.get(stat);
    }

    try {
      const response = await ApiService.get(`stat-leaders/${stat}`);
      this.perGameStatLeaderCache.set(stat, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching stat leaders", error);
    }
  }

  static totalStatLeaderCache = new Map();

  static async getTotalStatLeaders(stat) {
    if (this.totalStatLeaderCache.has(stat)) {
      return this.totalStatLeaderCache.get(stat);
    }

    try {
      const response = await ApiService.get(`stat-leaders/${stat}/Totals`);
      this.totalStatLeaderCache.set(stat, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching stat leaders", error);
    }
  }
}
