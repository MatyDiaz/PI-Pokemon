import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../redux/actions";
import axios from "axios";



const Form = () => {

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getAllTypes())
    },[dispatch]);
    
    const types = useSelector(state=>state.types);
    //console.log(types);

    const [form, setForm] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    });

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    })


    const inputHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        //validate({...form, [property]:value});
        setForm({...form, [property]:value});
        setErrors(validate({...form, [property]:value}));

        
    };

    const checkboxHandler = (e) => {
        const {checked, value} = e.target;

        if(checked && !form.types.includes(value)) {
            
            setForm({...form, types:[...form.types, value]});
            setErrors(validate({...form, types:[...form.types, value]}));
            console.log({...form, types:[...form.types, value]});

        } else {

            const deletedType= form.types.filter(el=>el!==value)
            setForm({...form, types:[...deletedType]});
            setErrors(validate({...form, types:[...deletedType]}));
            console.log({...form, types:[...deletedType]})
        }

    };

    const submitHandler = (e) => {
        //e.preventDefault();

        if(!Object.keys(errors).length) {
            axios.post('http://localhost:3001/pokemons', form)
            .then(
                setErrors({
                    name: '',
                    image: '',
                    hp: '',
                    attack: '',
                    defense: '',
                    speed: '',
                    height: '',
                    weight: '',
                    types: ''
                }),
                setForm({
                    name: '',
                    image: '',
                    hp: '',
                    attack: '',
                    defense: '',
                    speed: '',
                    height: '',
                    weight: '',
                    types: []
                })

            )
            .then(res=>alert(res))
            .catch(err=>alert(err))
        }else{
            alert('there are still error, please correct them')
        }
    };

    

    const validate = (form) => {
        const errors = {};
        if(!form.name) errors.name = 'Name is required';
        else if (!/^[A-Za-z]+$/.test(form.name)) errors.name = 'Only letters';

        if(!form.image) errors.image = 'Image is required';
        else if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(form.image))
        errors.image = 'Image must be an url';

        if(!form.hp) errors.hp = 'Health points are required';
        else if (!/^[0-9]/.test(form.hp)) errors.hp = 'HP must be a number';
        else if (form.hp < 1 || form.hp > 150) errors.hp = 'HP must be grater than 0 and less than 150'

        if(!form.attack) errors.attack = 'Attack is required';
        else if (!/^[0-9]/.test(form.attack)) errors.attack = 'Attack must be a number'
        else if (form.attack < 1) errors.attack = 'Attack must be greater than 0 and less than';

        if(!form.defense) errors.defense = 'Defense is required';
        else if (!/^[0-9]/.test(form.defense)) errors.defense = 'Defense must be a number';
        else if (form.defense < 1 || form.defense > 300) errors.defense = 'Defense must be grater than 0 and less than 300'

        if (!/^[0-9]/.test(form.speed) && form.speed!=='') errors.speed = 'Speed must be a number';
        if (!/^[0-9]/.test(form.height)&& form.height!=='') errors.height = 'Height must be a number';
        if (!/^[0-9]/.test(form.weight)&& form.weight!=='') errors.weight = 'weight must be a number';

        if (!form.types.length) errors.types = 'You must select at least one type'

        return errors;
        
    }; 

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label> Name </label>
                <input type="text" name='name' value= {form.name} onChange={inputHandler} />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Image </label>
                <input type="url" name='image' value= {form.image} onChange={inputHandler} />
                {errors.image && <span>{errors.image}</span>}
            </div>
            <div>
                <label>Health Points </label>
                <input type="text" name='hp' value= {form.hp} onChange={inputHandler} />
                {errors.hp && <span>{errors.hp}</span>}
            </div>
            <div>
                <label>Attack </label>
                <input type="text" name='attack' value= {form.attack} onChange={inputHandler} />
                {errors.attack && <span>{errors.attack}</span>}
            </div>
            <div>
                <label>Defense </label>
                <input type="text" name='defense' value= {form.defense} onChange={inputHandler} />
                {errors.defense && <span>{errors.defense}</span>}
            </div>
            <div>
                <label>Speed </label>
                <input type="text" name='speed' value= {form.speed} onChange={inputHandler} />
                {errors.speed && <span>{errors.speed}</span>}
            </div>
            <div>
                <label>Height </label>
                <input type="text" name='height' value= {form.height} onChange={inputHandler} />
                {errors.height && <span>{errors.height}</span>}
            </div>
            <div>
                <label>Weight </label>
                <input type="text" name='weight' value= {form.weight} onChange={inputHandler} />
                {errors.weight && <span>{errors.weight}</span>}
            </div>

            <div>
                <h2>Types</h2>
                <ul>
                    {types.map((type,index)=>
                          <li key={index+1}>
                            <input
                                id={index+1}
                                type= 'checkbox'
                                name= {type}
                                value={index+1}
                                onChange={checkboxHandler}
                            />
                            <label>{type}</label>
                          </li>  
                        )}
                </ul>
                {errors.types && <span>{errors.types}</span>}
            </div>

            <div>
                <button type='submit' disabled= {Object.keys(errors).length>0} > Create Pokemon! </button>
            </div>
        </form>
    )
};

export default Form;
