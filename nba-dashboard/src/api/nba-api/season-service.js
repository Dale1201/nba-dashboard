import ApiService from "../api-service";

export default class SeasonService {
  static statLeaderCache = new Map();

  static async getStatLeaders(stat) {
    console.log(this.statLeaderCache)
    if (this.statLeaderCache.has(stat)) {
        console.log("Cache hit for stat leaders", stat)
        return this.statLeaderCache.get(stat);
    }

    try {
      const response = await ApiService.get(`stat-leaders/${stat}`);
      this.statLeaderCache.set(stat, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching stat leaders", error);
    }
  }
}
