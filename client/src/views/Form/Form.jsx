import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../redux/actions";
import axios from "axios";
import style from './Form.module.css'



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
        if (!/^[0-9]/.test(form.weight)&& form.weight!=='') errors.weight = 'Weight must be a number';

        if (!form.types.length) errors.types = 'You must select at least one type'

        return errors;
        
    }; 

    return (
        <div className={style.mainContainer} >
            <form className={style.form} onSubmit={submitHandler}>
                <div className={style.divLabel} >
                    <label className={style.label}> Name </label>
                    <input className={style.input} type="text" name='name' value= {form.name} onChange={inputHandler} />
                </div>
                    {errors.name
                     && <p className={style.errorMsj} >{errors.name}</p>}
                <div className={style.divLabel} >
                    <label>Image </label>
                    <input type="url" name='image' value= {form.image} onChange={inputHandler} />
                </div>
                    {errors.image && <p className={style.errorMsj} >{errors.image}</p>}
                <div className={style.divLabel} >
                    <label>Health Points </label>
                    <input className={style.input} type="text" name='hp' value= {form.hp} onChange={inputHandler} />
                </div>
                    {errors.hp && <p className={style.errorMsj} >{errors.hp}</p>}
                <div className={style.divLabel} >
                    <label>Attack </label>
                    <input type="text" name='attack' value= {form.attack} onChange={inputHandler} />
                </div>
                    {errors.attack && <p className={style.errorMsj} >{errors.attack}</p>}
                <div className={style.divLabel} >
                    <label>Defense </label>
                    <input type="text" name='defense' value= {form.defense} onChange={inputHandler} />
                </div>
                    {errors.defense && <p className={style.errorMsj} >{errors.defense}</p>}
                <div className={style.divLabel} >
                    <label>Speed </label>
                    <input type="text" name='speed' value= {form.speed} onChange={inputHandler} />
                </div>
                    {errors.speed && <p className={style.errorMsj} >{errors.speed}</p>}
                <div className={style.divLabel} >
                    <label>Height </label>
                    <input type="text" name='height' value= {form.height} onChange={inputHandler} />
                </div>
                    {errors.height && <p className={style.errorMsj} >{errors.height}</p>}
                <div className={style.divLabel} >
                    <label>Weight </label>
                    <input type="text" name='weight' value= {form.weight} onChange={inputHandler} />
                </div>
                    {errors.weight && <p className={style.errorMsj} >{errors.weight}</p>}

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
                    {errors.types && <span className={style.errorMsj} >{errors.types}</span>}
                </div>

                <div>
                    <button type='submit' disabled= {Object.keys(errors).length>0} > Create Pokemon! </button>
                </div>
            </form>
        </div>
    )
};

export default Form;
