const {Type} = require('../db');
const {cleanTypesArray} =require('../helpers');


const getAllTypes = async () => {

    const typesRaw = await Type.findAll();
    return cleanTypesArray(typesRaw);
    
};

module.exports = getAllTypes;