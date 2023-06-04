const{createPokemon, getPokeById, getAllPokes, getPokeByName} = require('../controllers/pokesControllers');

const getPokemonsHandler = async (req, res) => {
    
    const {name} = req.query;

    try {
        const response = name ? await getPokeByName(name) : await getAllPokes() 
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error:error.message})
    }

};

const getByIdHandler = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id) ? 'BDD' : 'API';

    try {
        if(source === 'API' && id > 150 ) throw new Error('Pokemon inexistente');
        const pokemon = await getPokeById(id, source);
        res.status(200).json(pokemon);
        
    } catch (error) {
        res.status(400).json({error:'No hay coincidencias con ese ID'});
    }
};

const createPokemonHadler = async (req, res) => {
  const { name, hp, image, attack, defense, speed, height, weight, types } =
    req.body;

  try {
    const newPokemon = await createPokemon(
      name,
      hp,
      image,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    );
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getPokemonsHandler,
    getByIdHandler,
    createPokemonHadler
}