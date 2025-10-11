import {FaUser, FaClok} from 'react-icons/fa';

const Login = () => {
    return (
        <div className="container">
            <form>
                <h1>Cadasta o compromisso</h1>
               <div>
                <input type="text" placeholder="Digite o motivo do compromisso"/>
                <FaUser className='icon'/>
               </div>
               <div>
                <input type="time" placeholder="Hora do compromisso " /> 
               </div>
               <FaClok className='icon'/>
               <div>
                <input type="date" placeholder="Data do comprimisso"/>
               </div>
               <buuton>Salvar compromisso</buuton>
            </form>

        </div>
    )
}

export default Login;