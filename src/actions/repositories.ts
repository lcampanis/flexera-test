import axios from 'axios';
import { Endpoints } from '@octokit/types';

export type RepositoriesGetParams = {
  page: number;
  perPage: number;
}

export type RepositoriesGetResponse = {
  items: Endpoints['GET /search/repositories']['response']['data']['items'];
  total: number;
}

export type Respository = Endpoints['GET /search/repositories']['response']['data']['items'][0]

export const repositories = {
  async get(params: RepositoriesGetParams): Promise<RepositoriesGetResponse> {
    try {
      const { data } = await axios.get(`https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=${params.perPage}&page=${params.page}`) as Endpoints['GET /search/repositories']['response'];

      return {
        items: data.items,
        total: data.total_count
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
