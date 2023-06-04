import { Link } from "react-router-dom";
import style from './NavBar.module.css';
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";


const NavBar = () => {

    const dispatch = useDispatch();

    const clickHandler = (e) => {
        e.preventDefault();
        dispatch(getPokemons())
    }

    return (
        <div className={style.mainContainer} >

            <Link to='/home' > Home </Link>
            <button onClick={clickHandler}>
                Refresh
            </button>
            <Link to='/create' > Create </Link>
            <div>
                <SearchBar/>
            </div>

        </div>
    )
};

export default NavBar;