
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'
import CartContext from '../../context/CartContext'
import { useNotification } from '../../notification/Notification'

const InputCount = ({ onAdd, stock, initial = 1}) => {
    const [quantity, setQuantity] = useState(initial)


    
    const handleChange = (e) => {
        if(e.target.value <= stock && e.target.value > 0) {
            setQuantity(e.target.value)
        }
    }

    return (
        <div>
            <input type='number' onChange={handleChange} value={quantity}/>
            <button onClick={() => onAdd(quantity)}>Agregar al carrito</button>
        </div>
    )
}


const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const [quantity, setQuantity] = useState(0)
    const [inputType, setInputType] = useState('button')

    const { setNotification } = useNotification()

    const { addItem, getProduct } = useContext(CartContext)

    const Count = inputType === 'button' ? ItemCount : InputCount

    const handleOnAdd = (quantity) => {
        setQuantity(quantity)
        setNotification('success', 'Se agrego correctamente al carrito')
        addItem({ id, name, price, quantity: Number(quantity) })
    }

    return (
        <article className="CardItem">
            <button onClick={() => setInputType('input')}>Cambiar contador</button>
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Categoria: {category}
                </p>
                <p className="Info">
                    Descripción: {description}
                </p>
                <p className="Info">
                    Precio: {price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                {/* { quantity > 0  
                    ? <Link to='/cart' className='Option'>Finalizar compra</Link> 
                    : <ItemCount stock={stock} onAdd={handleOnAdd} initial={getProduct(id)?.quantity}/>} */}
                {/* { inputType === 'button'  
                    ? <ItemCount stock={stock} onAdd={handleOnAdd} initial={getProduct(id)?.quantity}/>
                    : <InputCount stock={stock} onAdd={handleOnAdd} initial={getProduct(id)?.quantity} />
                } */}
                <Count stock={stock} onAdd={handleOnAdd} initial={getProduct(id)?.quantity} />
            </footer>
        </article>
    )
}

export default ItemDetail