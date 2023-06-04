import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_BY_ID = 'GET_BY_ID';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const CLEAN_HOME = 'CLEAN_HOME';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const GET_BY_NAME = 'GET_BY_NAME';
//filters
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
//orders
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK'


export const getPokemons = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            'http://localhost:3001/pokemons'
            );
        const pokemons = apiData.data;
        
        dispatch({
            type: GET_POKEMONS,
            payload: pokemons
        })
    };    
};

export const getById = (id) => {
    return async function (dispatch) {
        const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
        const pokemon = apiData.data;

        dispatch({ type: GET_BY_ID, payload: pokemon })
    }
};

export const getAllTypes = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/types');
        const types = apiData.data;

        dispatch({type: GET_ALL_TYPES, payload: types});
    }
}

export const getByName = (name) => {
    return async function(dispatch) {
        const apiData = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        const pokeByName = apiData.data;
        console.log(apiData);

        dispatch({type:GET_BY_NAME, payload:pokeByName});
    }

    
};

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL}
};

export const cleanHome = () => {
    return {type: CLEAN_HOME}
};

//Filters

export const filterByOrigin = (origin) => {
    return {type:FILTER_BY_ORIGIN, payload: origin};
};

export const filterByType = (type) => {
    return {type:FILTER_BY_TYPE, payload:type};
};

//Order

export const orderByName = (orderType) => {
    return {type:ORDER_BY_NAME, payload: orderType}
};

export const orderByAttack = (orderType) => {
    return {type: ORDER_BY_ATTACK, payload: orderType}
};

