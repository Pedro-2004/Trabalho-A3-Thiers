import InputEmail from '../../Compose/InputEmail/InputEmail';
import InputPassword from '../../Compose/InputPassword/InputPassword';
import LoginButton from '../../Compose/LoginButton';
import InputCommitment from '../../Compose/InputCommitment/InputCommitment';



const LoginPage = () => {
    return(
        <div className="container">
            <h1>Página de Login </h1>
            <InputEmail/>
            <InputPassword/>
            <LoginButton/>
            <InputCommitment/>
        </div>
    )
}
export default LoginPage;