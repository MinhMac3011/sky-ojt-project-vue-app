import axios from "axios";
export default axios.create({
  baseURL: "quarkus-app.default.svc.cluster.local:8080/hello",
  //baseURL: "http://localhost:8080/hello",
  headers: {
    "Content-type": "application/json"
  }
});