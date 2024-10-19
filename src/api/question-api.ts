import { BASE_API } from "../environments/environment";
import { BaseApi } from "./base-api";

export class QuestionApi extends BaseApi {
  public async GetQuestions() {
    return await this.axios.get(BASE_API+'/posts');
  }
}