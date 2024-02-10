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
}