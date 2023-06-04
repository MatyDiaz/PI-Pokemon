import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";


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
        <div>
            <form onSubmit={submitHandlerSB} >
                <input 
                    type="text" 
                    placeholder="Search..."
                    onChange={inputHandlerSB}
                    value = {name}
                />
                <button type='submit' >Go!</button>
            </form>
        </div>
    )
    
};

export default SearchBar;