import './CartWidget.css'
import { useContext } from 'react'
import CartContext from '../../context/CartContext'
import { Link } from 'react-router-dom'

const CartWidget = () => {

    const { getQuantity } = useContext(CartContext)

    const quantity = getQuantity()

    return(
        <Link to='/cart' className="CartWidget">
            <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png?w=360" alt='cart-widget' className='CartImg'/>
            { quantity }
        </Link>
    );
}

export default CartWidget
