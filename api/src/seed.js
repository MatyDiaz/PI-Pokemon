const axios = require('axios');
const {Type} = require('./db');


const getTypes = async () => {
    const typesRaw = (await axios.get('https://pokeapi.co/api/v2/type')).data.results;

    const typesfinal = typesRaw.map(el => {
        return {
            name:el.name
        }
    });

    return typesfinal;
}

const seeders = async () => {
    const types = await getTypes();
    const results = await Type.findAll();
    
    if(!results.length) {
        Type.bulkCreate(types);
    }
};

// const pokeTypes = [
//     {name:'gluten free'},
//     {name:'ketogenic'},
//     {name:'lacto ovo vegetarian'},
//     {name:'vegan'},
//     {name:'dairy free'},
//     {name:'pescetarian'},
//     {name:'paleolithic'},
//     {name:'primal'},
//     {name:'low FODMAP'},
//     {name:'whole 30'},
// ];

// const seeders = async () => {
//     const results = await Type.findAll();
//     if(!results.length) {
//         Type.bulkCreate(pokeTypes);
//     } 
// };

module.exports = seeders




