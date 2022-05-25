import React from 'react'
import './App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/navbar/navbar';
import ItemCount from './components/countfunction/countfunction';


function App() {
  return (
    <div className="App">
        <NavBar />
        <ItemListContainer/>
        <ItemCount />
    </div>
  );
}

export default App;