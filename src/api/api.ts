import {catFactInstance, randomUserInstance} from "./axios.config.ts";

type CatFacts = {
    fact: string;
    length: number;
}[];

type Users = {
    name: {
        title: string;
        first: string;
        last: string;
    };
    picture: {
        thumbnail: string;
    };
}[];

export const getCatFacts = async (page: number): Promise<CatFacts> => {
    try {
        const response = await catFactInstance.get('/facts', {
            params: {
                limit: 10,
                page: page,
                max_length: 140
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getUsers = async (page: number): Promise<Users> => {
    try {
        const response = await randomUserInstance.get('', {
            params: {
                results: 10,
                page: page,
                inc: 'name,picture'
            }
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}