import {Link} from 'react-router-dom';
import './style.css';
import InputEmail from '../../Compose/InputEmail/InputEmail';
import InputPassword from '../../Compose/InputPassword/InputPassword';
import LoginButton from '../../Compose/LoginButton';



const LoginPage = () => {
    return(
        <div className="container">
            <h1>Página de Login </h1>
            <InputEmail/>
            <InputPassword/>
            <LoginButton/>
        </div>
    )
}
export default LoginPage;