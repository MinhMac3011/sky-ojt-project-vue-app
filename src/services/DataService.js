import http from "../http-common";
class DataService {
  getInfo() {
    return http.get("/info");
  }
  getAll() {
      return http.get("/all");
  }
}
export default new DataService();