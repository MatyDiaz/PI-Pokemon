const {Router} = require('express');

const pokemonsRouter = Router();

const {
  getPokemonsHandler,
  getByIdHandler,
  createPokemonHadler,
} = require("../handlers/pokemonsHandlers");

pokemonsRouter.get('/', getPokemonsHandler);

pokemonsRouter.get('/:id', getByIdHandler);

pokemonsRouter.post('/', createPokemonHadler);

module.exports = pokemonsRouter;