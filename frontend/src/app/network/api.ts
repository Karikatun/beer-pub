import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

export const apiInstanse = axios.create();

class Api {
  public getBeers = async ({ page, sortBy, style, sortOrder }: { page: number, sortBy?: string, style?: string, sortOrder?: string} ) => {
    const url = `${baseURL}/beers`;
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
      params: { page, sortBy, style, sortOrder }
    });

    return response;
  };

  public getBeerStyles = async () => {
    const url = `${baseURL}/beerStyles`;
    const response = await axios.get(url, { headers: { 'Content-Type': 'application/json' } });

    return response;
  };

  public getBeerImage = async ({ id, name, description, style, brewery }: {id: number, name: string, description: string, style: string, brewery: string}) => { 
    const url = `${baseURL}/beer/${id}/image`;
    const response = await axios.post(
      url,
      {
        headers: { 'Content-Type': 'application/json' },
        data: { name, description, style, brewery }
      }
    );

    return response;
  }

  public getBeerItem = async (id: number) => {
    const url = `${baseURL}/beer/${id}`;
    const response = await axios.get(
      url,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response;
  }
}

const api = new Api();

export { api };
