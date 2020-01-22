import axios from 'axios';

/**
 * @desc function to get the initial data
 * @returns {Promise} returns initial data promise
 */
const getInitialData = () => axios.get("https://rickandmortyapi.com/api/character/");

export default getInitialData;
