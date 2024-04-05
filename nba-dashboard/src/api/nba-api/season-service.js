import ApiService from "../api-service";

export default class SeasonService {
  static regStatLeaderCache = new Map();
  static regCurrentSeason = "2023-24";

  static async getRegStatLeaders(stat, season) {
    if (season && season !== this.regCurrentSeason) {
      this.regCurrentSeason = season;
      this.regStatLeaderCache.clear();
    }
    if (this.regStatLeaderCache.has(stat)) {
      return this.regStatLeaderCache.get(stat);
    }

    try {
      const response = await ApiService.get(`stat-leaders/${stat}`, {
        params: { season: this.regCurrentSeason },
      });
      this.regStatLeaderCache.set(stat, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching stat leaders", error);
    }
  }

  static playoffsStatLeaderCache = new Map();
  static playoffsCurrentSeason = "2023-24";
  static async getPlayoffsStatLeaders(stat, season) {
    if (season && season !== this.playoffsCurrentSeason) {
      this.playoffsCurrentSeason = season;
      this.playoffsStatLeaderCache.clear();
    }

    if (this.playoffsStatLeaderCache.has(stat)) {
      return this.playoffsStatLeaderCache.get(stat);
    }

    try {
      const response = await ApiService.get(`stat-leaders/${stat}`, {
        params: { season_type: "Playoffs", season: this.playoffsCurrentSeason },
      });
      this.playoffsStatLeaderCache.set(stat, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching stat leaders", error);
    }
  }

  static async getAwardWinners(season) {
    try {
      const response = await ApiService.get("award-winners", {
        params: { season },
      });
      ;
      return response.data.length > 0 ? response.data[0].awards : null;
    } catch (error) {
      console.error("Error fetching award winners", error);
    }
  }
}
