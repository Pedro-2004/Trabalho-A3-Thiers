import {BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from './Page/LoginPage/index';
import Login from './Page/CommitmentRegistration/index';




const App = () => {
  return(
         
    <div
      className='App'>
      <BrowserRouter>
      <Routes>

      <Route path="/"element={<LoginPage />} />
      <Route path="/Login"element={<Login/>}/>
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
 