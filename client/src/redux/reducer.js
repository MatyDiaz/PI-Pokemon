import {
  GET_POKEMONS,
  GET_BY_ID,
  CLEAN_DETAIL,
  GET_ALL_TYPES,
  GET_BY_NAME,
  CLEAN_HOME,
  FILTER_BY_ORIGIN,
  FILTER_BY_TYPE,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK
} from "./actions";

const initialState = {
  pokemons: [],
  allPokemons:[],
  pokeDetail: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload, allPokemons:action.payload };

    case GET_BY_ID:
      return { ...state, pokeDetail: action.payload };

    case CLEAN_DETAIL:
      return { ...state, pokeDetail: {} };

    case CLEAN_HOME:
      return {...state, pokemons:[]}  

    case GET_ALL_TYPES:
      return { ...state, types: action.payload };

    case GET_BY_NAME:
        return {...state, pokemons: action.payload};
    case ORDER_BY_NAME:
      let sortedArr = action.payload ==='asc'?
          state.pokemons.sort(function(a, b){
            if(a.name>b.name) {
              return 1;
            }
            if(b.name>a.name) {
              return -1;
            }
            return 0;
          }):
          state.pokemons.sort(function(a, b){
            if(a.name>b.name) {
              return -1;
            }
            if(b.name>a.name) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        pokemons:sortedArr
      }
    case ORDER_BY_ATTACK: 
      const sortedByAttack = action.payload === 'asc'
        ? state.pokemons.sort(function (a, b) {
          if(a.attack>b.attack) {
            return 1;
          }
          if(b.attack>a.attack) {
            return -1;
          }
          return 0;
        })
        : state.pokemons.sort(function(a, b) {
          if(a.attack>b.attack) {
            return -1;
          }
          if(b.attack>a.attack) {
            return 1;
          }
          return 0;
        })

      return {
        ...state,
        pokemons: sortedByAttack
      };

        
    case FILTER_BY_ORIGIN:
        //console.log(action.payload);
        //const unfilPokemons = state.allPokemons
        const originFiltered = action.payload === 'created' ? state.allPokemons.filter(el => el.created) : state.allPokemons.filter(el=>!el.created);
        //console.log(originFiltered);
        
        return {
          ...state,
          pokemons: action.payload ==='all'? state.allPokemons : originFiltered
        }  
    case FILTER_BY_TYPE:
      const typeFiltered = action.payload === 'all'? state.allPokemons : state.allPokemons.filter(el=>el.types.includes(action.payload));
      console.log(typeFiltered);
      return{
        ...state,
        pokemons: typeFiltered
      }   

    default:
      return { ...state };
  }
};

export default rootReducer;
