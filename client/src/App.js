import './App.css';
import React from 'react';
import { Link, Route, Routes, BrowserRouter} from "react-router-dom";
import Home from './Home';
import Result from './result';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route exact path="/result/:code" element={<Result/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
