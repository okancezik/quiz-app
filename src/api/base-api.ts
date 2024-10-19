import { AxiosInstance } from "axios";
import { BASE_API } from "../environments/environment";

export class BaseApi {

  axios: AxiosInstance;
  basePath:string;
  
  constructor(axios: AxiosInstance,basePath=BASE_API) {
    this.axios = axios;
    this.basePath = basePath||BASE_API
  }
}