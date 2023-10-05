import SimpleFactory from '../core/SimpleFactory';
import { IStarWarsPerson } from '../../interfaces/project';
import { IHttpClient } from '../../interfaces/project';

export class SwapiAPI {

  static BASE_URL: string = 'https://swapi.dev/api';
  httpClient: IHttpClient;

  constructor(client: IHttpClient) {
    this.httpClient = client
    this.httpClient.setBaseUrl(SwapiAPI.BASE_URL);
  }

  async getPeople(): Promise<IStarWarsPerson[]> {
    const data = await this.httpClient.get('/people');
    return data.results as IStarWarsPerson[];
  }

}

export function create() {
  const client: IHttpClient = SimpleFactory.create('http');
  return new SwapiAPI(client);
}
