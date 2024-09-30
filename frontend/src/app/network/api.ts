import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

export const apiInstanse = axios.create();

class Api {
  public getBeers = async (page: number, sortBy?: string, style?: string) => {
    const url = `${baseURL}/beers`;
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
      params: { page, sortBy, style }
    });

    return response;
  };

  public getBeerStyles = async () => {
    const url = `${baseURL}/beerStyles`;
    const response = await axios.get(url, { headers: { 'Content-Type': 'application/json' } });

    return response;
  };
}

const api = new Api();

export { api };
