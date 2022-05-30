
import './navbar.css'
import Carrito from '../carrito/Carrito';
import { Link, NavLink } from 'react-router-dom'
const navbar = () => {

    
    return (
      <nav className="NavBar" >
      <NavLink to='/' className='titulo'>
        Tienda Online
      </NavLink>
      <div className="Categories">
         
          <NavLink to='/category/pantalones' className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Pantalones</NavLink>
          <NavLink to='/category/remeras' className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Remeras</NavLink>
          
      </div>
      <Carrito />
  </nav>
    )
}

export default navbar