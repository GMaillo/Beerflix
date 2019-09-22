'use strict';

const API_KEY = 'NJD5ZCW-9D84NF5-PP5B6ER-QNPKQM8';
const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/') => {
    const searchAPIEndpoint = `${API_URL}beers?search=`;
    const showsAPIEndpoint = `${API_URL}beers`;

    return {
        getBeers: async textQuery => {
            try {
                const requestURL = textQuery ? `${searchAPIEndpoint}${textQuery}&limit=10` : `${showsAPIEndpoint}?limit=10`;
                const response = await fetch(requestURL, {
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching beers');
                }
                const data = await response.json();
                return data.beers;

            }
            catch (err) {
                console.error(err.message);
                throw err;
            }
        },

        getBeersData: async (textQuery, startDataQuery, endDataQuery) => {
            try {
                const requestURL = textQuery ? `${searchAPIEndpoint}${textQuery}` : `${showsAPIEndpoint}`;
                const response = await fetch(requestURL, {
                    headers: {
                        'accept': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching beers');
                }
                const data = await response.json();

                const filterBeers = data.beers.filter(function (beer) {
                    const inputDate = beer.firstBrewed.split('/');
                    if (parseInt(inputDate[1]) > startDataQuery.split("-")[0] && parseInt(inputDate[1]) < endDataQuery.split("-")[0]) {
                        return beer;
                    } else if (parseInt(inputDate[1]) == startDataQuery.split("-")[0]) {
                        if (parseInt(inputDate[0]) > startDataQuery.split("-")[1]) {
                            return beer;
                        }
                    } else if (parseInt(inputDate[1]) == endDataQuery.split("-")[0]) {
                        if (parseInt(inputDate[0]) < endDataQuery.split("-")[1]) {
                            return beer;
                        }
                    }
                });

                if (filterBeers.length > 10) {
                    return filterBeers.slice(0, 10);
                } else {
                    return filterBeers;
                }
            }
            catch (err) {
                console.error(err.message);
                throw err;
            }
        },

        getBeersDetail: async id => {
            try {
              const requestURL = `${showsAPIEndpoint}/${id}`;
              const response = await fetch(requestURL, {
                headers: {
                    'accept': 'application/json',
                    'X-API-KEY': API_KEY,
                },
            });
                if (!response.ok) {
                    throw new Error('Error getting a beer detail');
                }
                const data = await response.json();
               
                return data.beer;

               } catch (err) {
                    console.error(err);
                    throw err;
                }
            }, 
            
            createQuote: async (id, text) => {
                try {
                    const response = await fetch(`${API_URL}/quote/${id}`, {
                        method: 'POST',
                        body: JSON.stringify({comment: text }),
                        headers: {
                            'Content-type': 'application/json',
                            'X-API-KEY': API_KEY, 
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Error fetching quote');
                    }

                    const responseBody = await response.json();
                    return responseBody;
                } catch (err) {
                    console.error(err);
                    throw err;
                }
     
            },

            addLike: async (id) => {
                try {
                    const response = await fetch(`${API_URL}beers/${id}/like`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'X-API-KEY': API_KEY, 
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Adding like');
                    }
                    
                    const responseBody = await response.json();
                    return responseBody;
                } catch (err) {
                    console.error(err);
                    throw err;
                }
     
            },
            

    };
};

export default api;
