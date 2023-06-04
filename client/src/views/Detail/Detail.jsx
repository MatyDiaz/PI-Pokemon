import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, cleanDetail } from "../../redux/actions";

const Detail = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const pokeDetail = useSelector((state)=>state.pokeDetail);

    useEffect(()=>{
        dispatch(getById(params.id))

        return () => {
            dispatch(cleanDetail());
        };

    },[dispatch, params.id])

    return (
        <div>
            <h1>{pokeDetail.name}</h1>
            <img 
                src={`${pokeDetail.image}`} 
                alt="pokemon" 
                height= '200px' 
                width= '200px'
            />
            <p> Health Points: <span>{pokeDetail.hp}</span></p>
            <p> Attack: <span>{pokeDetail.attack}</span></p>
            <p> Defense: <span>{pokeDetail.defense}</span></p>
            <p> Speed: <span>{pokeDetail.speed}</span></p>
            <p> Height: <span>{pokeDetail.height}</span></p>
            <p> Weight: <span>{pokeDetail.weight}</span></p>
            <p> Types: <span> {pokeDetail.types} </span> </p>

        </div>
    )
};

export default Detail;