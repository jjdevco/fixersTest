import axios from "axios";

const endpointURL = `http://localhost:5000/testfixers/us-central1/api`;

const instance = axios.create({
  baseURL: endpointURL,
});

export default {
  clients: {
    getAll: (options = {}) => instance.get("/clients", options),
    getOne: (id, options = {}) => instance.get("/client/" + id, options),
    create: (data, options = {}) => instance.post("/client", data, options),
    updateOne: (id, data, options = {}) =>
      instance.post("/client/" + id, data, options),
    deleteOne: (id, options = {}) => instance.delete("/client/" + id, options),
  },
  cars: {
    getAll: (options = {}) => instance.get("/cars", options),
    getOne: (id, options = {}) => instance.get("/car/" + id, options),
    create: (data, options = {}) => instance.post("/car", data, options),
    updateOne: (id, data, options = {}) =>
      instance.post("/car/" + id, data, options),
    deleteOne: (id, options = {}) => instance.delete("/car/" + id, options),
  },
};
