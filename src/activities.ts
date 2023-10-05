import { IStarWarsPerson } from './interfaces/project';
import { create as createSwapiAPI } from './lib/starwars/SwapiAPI';

export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function getStarWarsPeople(): Promise<IStarWarsPerson[]> {
  const swapiAPI = createSwapiAPI();
  return await swapiAPI.getPeople();
}
