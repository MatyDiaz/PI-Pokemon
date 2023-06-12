import { Link } from "react-router-dom";
import style from './Landing.module.css'


const Landing =  () => {


    return(
        <div className={style.fondo}>
            <div className={style.button}>
                <Link to='/home' >
                   Welcome!
                </Link>
            </div>
        </div>
    )
};
export default Landing;