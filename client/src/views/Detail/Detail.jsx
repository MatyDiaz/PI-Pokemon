import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, cleanDetail } from "../../redux/actions";
import style from './Detail.module.css'

const Detail = () => {
    const pokeDetail = useSelector((state)=>state.pokeDetail);
    
    const params = useParams();
    const dispatch = useDispatch();
    console.log(pokeDetail, 'detalle');
    useEffect(()=>{

        dispatch(getById(params.id))
        return () => {
            dispatch(cleanDetail());
        };

    },[dispatch, params.id])

    return (
        <div className={style.detailContainer}>
            {Boolean(Object.keys(pokeDetail).length) && 
            <>
                <h1>{pokeDetail.name.toUpperCase()}</h1>
                <img 
                    src={`${pokeDetail.image}`} 
                    alt="pokemon" 
                    height= '200px' 
                    width= '200px'
                />
                <p className={style.status}> Health Points: <span>{pokeDetail.hp}</span></p>
                <p className={style.status}> Attack: <span>{pokeDetail.attack}</span></p>
                <p className={style.status}> Defense: <span>{pokeDetail.defense}</span></p>
                <p className={style.status}> Speed: <span>{pokeDetail.speed}</span></p>
                <p className={style.status}> Height: <span>{pokeDetail.height}</span></p>
                <p className={style.status}> Weight: <span>{pokeDetail.weight}</span></p>
                <div className={style.typesContainer}>
                    <p className={style.type}> Type: </p>
                    {pokeDetail.types.map((el,index)=><span key={index}> {el} </span>)}      
                </div>
            </>
            }
        </div>
    )
};

export default Detail;