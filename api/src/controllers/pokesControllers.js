const {Pokemon, Type} = require('../db')
const axios = require('axios');
const {cleanApiArray, cleanDbArray, cleanApiPoke, cleanDbPoke}= require('../helpers');

const createPokemon = async (
  name,
  hp,
  image,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  const newPokemon = await Pokemon.create({
    name,
    hp,
    image,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  newPokemon.addTypes(types);
  
  return newPokemon;
};

const getPokeById = async (id, source) => {

    if(source === 'API') {
        const pokeRaw = (await axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`))
        .data;

        return cleanApiPoke(pokeRaw);

    } else {
        const pokeRaw = await Pokemon.findByPk(id,{
            include: {
                model: Type,
                through: {
                    attributes:[],
                }
            }
        });
        return cleanDbPoke(pokeRaw);
    }

    // const wantedPoke = 
    //     source === 'API'
    //     ? (await axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`))
    //         .data
    //     : await Pokemon.findByPk(id);

    // return wantedPoke    
};

const getAllPokes = async () => {

    const dbPokesRaw = await Pokemon.findAll({
        include: {
            model: Type,
            through: {
                attributes:[],
            } 
        }
    });

    const cleanedDbPokes = cleanDbArray(dbPokesRaw);
    
    const apiPokesRaw1 = 
        (await axios.get('http://pokeapi.co/api/v2/pokemon?limit=150')).data.results;
    //const apiPokesRaw2 = apiPokesRaw1.map(async el=> (await axios.get(`${el.url}`)).data);
    //const pokeDetails = await Promise.all(apiPokesRaw2);
    //const pokeFinal = cleanApiArray(pokeDetails);
    //return pokeFinal;
   
    const apiPokesRaw2 = await Promise.all(apiPokesRaw1.map(async el=> (await axios.get(`${el.url}`)).data));
    const cleanedApiPokes = cleanApiArray(apiPokesRaw2);

    return [...cleanedDbPokes, ...cleanedApiPokes];
  

};

const getPokeByName = async (name) => {

  if (name.length < 3) throw new Error("La longitud del parametro es insuficiente");

  const allPokesRaw = await getAllPokes();

  const wantedPoke = allPokesRaw.filter((poke) =>
    poke.name.toLowerCase().includes(name.toLowerCase())
  );
  
  if(!wantedPoke.length) throw new Error('No se encontraron pokemones con ese nombre');

  return wantedPoke;

};

module.exports = {createPokemon, getPokeById, getAllPokes, getPokeByName};