import { catFactInstance, randomUserInstance } from './axios.config.ts';

type Fact = {
  fact: string;
  length: number;
};

export type CatFacts = {
  data: Fact[];
  current_page: number;
  total_page: number;
};

export type Users = {
  info: {
    page: number;
  };
  results: {
    name: {
      title: string;
      first: string;
      last: string;
    };
    picture: {
      thumbnail: string;
    };
    id: {
      name: string;
      value: string;
    };
  }[];
};

export const getCatFacts = async (page: number): Promise<CatFacts> => {
  try {
    const response = await catFactInstance.get('/facts', {
      params: {
        limit: 10,
        page: page,
        max_length: 200,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: [], current_page: 0, total_page: 0 };
  }
};

export const getUsers = async (page: number): Promise<Users> => {
  try {
    const response = await randomUserInstance.get('', {
      params: {
        results: 10,
        page: page,
        inc: 'name,picture,id',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { info: { page: 0 }, results: [] };
  }
};
