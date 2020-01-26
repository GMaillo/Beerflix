'use strict';
const API_KEY = 'NJD5ZCW-9D84NF5-PP5B6ER-QNPKQM8';
const API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/';


const beersAPIEndpoint = `${API_URL}beers`;

const getBeers = async (filters) => {
    const url = filters ? `${beersAPIEndpoint}?search=${filters.name}` : beersAPIEndpoint;
    let beers = [];
    await axios(
    { 
        method: 'GET', 
        url: url, 
        headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
        }
    }).then( response => {
        if(!response.data.success)  {
            console.error(response.data.error);
            return ;
        }
        beers = response.data.beers;
    }).catch(err => {
        console.error(err);        
    });
    return beers;
};

const getBeerDetail = async id => {
    const url = `${beersAPIEndpoint}/${id}`;
    let beer;
    await axios(
    { 
        method: 'GET', 
        url: url, 
        headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
        }
    }).then( response => {
        if(!response.data.success)  {
            console.error(response.data.error);
            return ;
        }
        beer = response.data.beer;
    }).catch(err => {
        console.error(err);        
    });
    return beer;
};

const setBeerLike = async id => {
    const url = `${beersAPIEndpoint}/${id}/like`;
    let success;
    await axios(
    { 
        method: 'POST', 
        url: url, 
        headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
        }
    }).then( response => {
        success = response.data.success;
        if(!success)
            console.error(response.data.error);
    }).catch(err => {
        console.error(err);        
    });
    return success;
};

const setBeerComment = async (id, comment) => {
    const url = `${beersAPIEndpoint}/${id}/comment`;
    let success;
    await axios(
    { 
        method: 'POST', 
        url: url, 
        headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
        },
        data: {
            comment: comment
        }
    }).then( response => {
        success = response.data.success;
        if(!success)
            console.error(response.data.error);
    }).catch(err => {
        console.error(err);        
    });
    return success;
};

export { getBeers, getBeerDetail, setBeerLike, setBeerComment };