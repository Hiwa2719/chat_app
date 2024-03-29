import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './screens/Home'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import SignUp from "./screens/SignUp";
import Account from "./screens/account";


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/account/" element={<Account/>}/>
      <Route path='/signup/' element={<SignUp/>}/>
    </Routes>
    </div>
  );
}

export default App;
