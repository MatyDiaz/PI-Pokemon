import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";
import style from './SearchBar.module.css';


const SearchBar = () => {
    const dispatch = useDispatch();
    

    const [name, setName] = useState('');

    const inputHandlerSB = (e) => {

        const value = e.target.value;
        setName(value);
        //console.log(name);

    };

    const submitHandlerSB = (e) => {
        e.preventDefault();
        dispatch(getByName(name));
        setName('');
        // setTimeout(()=>{
        //     setName('');
        // }, '4000')

    }



    return (
        <div className={style.container}>
            <form onSubmit={submitHandlerSB} >
                <input 
                    type="text" 
                    placeholder="Search..."
                    onChange={inputHandlerSB}
                    value = {name}
                />
                <button type='submit' >GO!</button>
            </form>
        </div>
    )
    
};

export default SearchBar;