
export interface IHttpClient {
  get: (url: string) => Promise<any>;
  setBaseUrl: (baseUrl: string) => void;
}

export type IStarWarsPerson = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export type FilterConditionOperator = '=' | 'contains' | '@';

export interface IFilterCondition {
  propertyName: string;
  operator: FilterConditionOperator;
  value: any;
}
