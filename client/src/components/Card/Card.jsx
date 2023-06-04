import style from './Card.module.css';
import { Link } from 'react-router-dom';


const Card = (props) => {
    return (
        <Link to= {`/detail/${props.id}`}  >
            <div className = {style.card} >
             
                <img 
                    height= '200px' 
                    width= '200px' 
                    alt= 'pokemon' 
                    src= {props.image} 
                />
                <p> {props.name} </p>
                <p> {props.types} </p>

            </div>
        </Link>
    )
};

export default Card;