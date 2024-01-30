import ApiService from "./api-service";

export default class PlayerService {
    static async getPlayers(searchTerm) {
        if (!searchTerm) {
            const response = await ApiService.get("players");
            return response.data;
        }
        const response = await ApiService.get(`players?search=${searchTerm}`);
        return response.data;
    }
}