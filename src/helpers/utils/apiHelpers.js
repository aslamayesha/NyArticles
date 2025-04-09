import axios from 'axios';

export const fetchArticles = async () => {
    const response = await axios.get(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${import.meta.env.VITE_APP_API_KEY}`,
    );
    return response.data.results;
};
