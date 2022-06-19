import React from 'react'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartContextProvider } from './context/CartContext';
import { NotificationProvider } from './notification/Notification';
import { Navigate } from 'react-router-dom'

const App = () => { 
  return (
    <div className="App">
        <CartContextProvider>
          <NotificationProvider>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path='/' element={<ItemListContainer greeting="Todos los Productos"/>}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting="Productos filtrados por categoria"/>}/>
                <Route path='/detail/:productId' element={<ItemDetailContainer />}/>
                <Route path='/about' element={<h1>About</h1>}/>
                <Route path='/cart' element={<Cart />}/>
                <Route path='*' element={<Navigate to='/'/>} />
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </CartContextProvider>
    </div>
  );
}

export default App;