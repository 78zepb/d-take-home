import fetch from 'node-fetch';
import { IHttpClient } from '../../interfaces/project';

export class HttpClient implements IHttpClient {

  baseUrl!: string;

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }

  async get(url: string): Promise<any> {
    if (!this.baseUrl) {
      throw Error('HttpClient set base url');
    }
    const response = await fetch(`${this.baseUrl}${url}`);
    return await response.json();
  }
}
