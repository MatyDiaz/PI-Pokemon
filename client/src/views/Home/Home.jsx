import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Paginado from "../../components/Paginado/Paginado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanHome, getPokemons, filterByOrigin, filterByType, orderByName, orderByAttack, getAllTypes } from "../../redux/actions";
import style from './Home.module.css'

const Home = () => {

    const dispatch = useDispatch()
    const pokemons = useSelector((state) => state.pokemons);
    const types = useSelector(state=>state.types);


    const [orden, setOrden] = useState('');
    const [orden2, setOrden2] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage, setPokemonPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = pokemons.slice(
      indexOfFirstPokemon,
      indexOfLastPokemon
    );
  
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch (getPokemons());
        dispatch (getAllTypes());

        return () => {
           dispatch(cleanHome());
        };   

    },[dispatch])

    const originHandler = (e) => {
        const origin = e.target.value;
        dispatch(filterByOrigin(origin));
    };

    const typeHandler = (e) => {
        console.log(typeof(e.target.value));     
        dispatch(filterByType(e.target.value));
        setCurrentPage(1);
    };

    const sortNameHandler = (e) => {
        //e.preventDefault()
        const sortType = e.target.value;
        dispatch(orderByName(sortType));
        setCurrentPage(1);
        setOrden(`Ordenado ${sortType}`)
    };
    const sortAttackHandler = (e) => {
        const sortType= e.target.value;
        dispatch(orderByAttack(sortType));
        setCurrentPage(1);
        setOrden2(`Ordenado ${sortType}`)
    };

    return (
        <div className={style.fondo}>
            <div>
                <div className={style.filtersContainer} >
                    <span>Alphabetical</span>
                    <select onChange={sortNameHandler}>
                        <option value='asc' >Asc</option>
                        <option value='desc' >Desc</option>
                    </select>
                    <span>Attack</span>
                    <select onChange={sortAttackHandler}>
                        <option value='asc' >Asc</option>
                        <option value='desc' >Desc</option>
                    </select>
                    <span>Origen</span>
                    <select onChange={originHandler}>
                        <option value='all'>All</option>
                        <option value='Api' >Original</option>
                        <option value='created'>Created</option>
                    </select>
                    <span>Type</span>
                    <select onChange={typeHandler}>
                        <option value='all'>All</option>
                        {
                            types && types.map((el, index)=>
                                <option key={index} value={el}>{el.charAt(0).toUpperCase()+el.slice(1)}</option>
                                )
                        }
                    </select>
                </div>                
            </div>
            <div>
                <Paginado
                    pokemonPerPage={pokemonPerPage}
                    pokemons={pokemons.length}
                    paginado={paginado}
                />
            </div>
            <div>
                {Boolean(currentPokemons.length)?
                    <CardsContainer
                        currentPokemons = {currentPokemons}
                    />: <p>cargando...</p>
                
            }
            </div>


        </div>
    )
};

export default Home;