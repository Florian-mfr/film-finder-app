import { BaseApiService } from "./base-api.service";

export class FilmApiService extends BaseApiService {
  protected baseUrl: string = 'http://localhost:3000/api/film';
}