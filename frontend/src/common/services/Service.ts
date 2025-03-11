import axios, { type AxiosRequestConfig } from "axios";
import { config } from "@config/config";

class Service {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.SERVER_HOST;
  }

  async get(url: string, config?: AxiosRequestConfig) {
    return await axios.get(this.baseUrl + url, config);
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    return await axios.post(this.baseUrl + url, data, config);
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig) {
    return await axios.put(this.baseUrl + url, data, config);
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    return await axios.delete(this.baseUrl + url, config);
  }
}

const service = new Service();
Object.freeze(service);

export default service;
