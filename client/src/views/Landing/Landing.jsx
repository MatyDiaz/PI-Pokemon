import { Link } from "react-router-dom";


const Landing =  () => {


    return(
        <>
            <h1>Esta es la vista de Landing</h1>
            <Link to='/home' >
                <h3>Welcome</h3>
            </Link>
        </>
    )
};
export default Landing;