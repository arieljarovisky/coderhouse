import { useContext, useEffect } from 'react'
import Carrito from '../Carrito/Carrito'
import './navbar.css'
import { Link, NavLink } from 'react-router-dom'
import CartContext from '../../context/CartContext'

const NavBar = () => {
  const { getQuantity } = useContext(CartContext)

  const quantity = getQuantity()

  return (
      <nav className="NavBar" >
          <Link to='/'>
            <h3>Tienda Online</h3>
          </Link>
          <div className="Categories">
          
              <NavLink to='/category/pantalones' className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Pantalones</NavLink>
              <NavLink to='/category/remeras' className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Remeras</NavLink>
             
          </div>
          {quantity > 0 && <Carrito />}
      </nav>
  )
}

export default NavBar