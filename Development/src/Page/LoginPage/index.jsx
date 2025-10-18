import {Link} from 'react-router-dom';
import './style.css';
import InputEmail from '../../Compose/InputEmail/InputEmail';
import InputPassword from '../../Compose/InputPassword/InputPassword';


const LoginPage = () => {
    return(
        <div className="container">
            <h1>Página de Login </h1>
            <InputEmail/>
            <InputPassword/>
            <Link to="/Login"> Ir para página de login de compromisso</Link>
            <button  className='recall-forget'> logar</button>
            
        </div>
    )
}
export default LoginPage;