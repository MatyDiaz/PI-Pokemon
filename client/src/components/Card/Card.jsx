import style from './Card.module.css';
import { Link } from 'react-router-dom';


const Card = (props) => {
    return (
        <Link to= {`/detail/${props.id}`}  >
            <div className = {style.card} >
             
                <img className={style.image}
                    height= '150px' 
                    width= '150px' 
                    alt= 'pokemon' 
                    src= {props.image} 
                />
                <p className={style.pokeName} > {props.name.toUpperCase()} </p>
                <p className={style.type}> {props.types.join('/')} </p>

            </div>
        </Link>
    )
};

export default Card;