import axios from 'axios';

const API_KEY = 'js3vYlAEud4E_3IXmVe7TTaBrXAHaS1SApRLf3_q2Nw';

export async function fetchImg (query, page, controllerRef) {
    const separated = query.split('/');
    const extractedQuery = separated[1];

    const response = await axios.get(`https://api.unsplash.com/search/photos?`, {
        signal: controllerRef.current.signal,
        params: { 
          client_id: API_KEY,
        query: extractedQuery,
        page,
        orientation: 'portrait',
        per_page: 12,
     }});

console.log(response);
    return response.data;
}