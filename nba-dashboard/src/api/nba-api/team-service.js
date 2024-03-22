import ApiService from "../api-service";

export default class TeamService {
  static async getTeams() {
    try {
      const response = await ApiService.get(`teams/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching teams", error);
    }
  }
}
