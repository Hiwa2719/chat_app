import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './screens/Home'
import 'bootstrap/dist/css/bootstrap.css'


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </div>
  );
}

export default App;
