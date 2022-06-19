
import { useState, useContext } from "react"
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import { addDoc, collection, updateDoc, doc, getDocs, query, where, documentId, writeBatch } from 'firebase/firestore'
import { db, collectionsName } from '../../services/firebase'
import { useNotification } from '../../notification/Notification'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const [loading, setLoading] = useState(false)

    const { cart, clearCart, getTotal, getQuantity } = useContext(CartContext)  

    const { setNotification } = useNotification()

    const navigate = useNavigate()

    const createOrder = () => {
        console.log('crear orden')
        setLoading(true)

        const objOrder = {
            buyer: {
                name: 'Sebastian Zuviria',
                email: 'seba@email.com',
                phone: '123456789',
                address: 'direccion 12345',
                comment: 'comentario'
            },
            items: cart,
            total: getTotal()
        }

        const ids = cart.map(prod => prod.id)

        const batch = writeBatch(db)

        const outOfStock = []

        const collectionRef = collection(db, 'products')

        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
            .then(response => {
                response.docs.forEach(doc => {
                    const dataDoc = doc.data()
                    const prodQuantity = cart.find(prod => prod.id === doc.id)?.quantity

                    if(dataDoc.stock >= prodQuantity) {
                        batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity})
                    } else {
                        outOfStock.push({ id: doc.id, ...dataDoc})
                    }
                })
            }).then(() => {
                if(outOfStock.length === 0) {
                    const collectionRef = collection(db, 'orders')
                    return addDoc(collectionRef, objOrder)
                } else {
                    return Promise.reject({ type: 'out_of_stock', products: outOfStock})
                }
            }).then(({ id }) => {
                batch.commit()
                clearCart()
                setNotification('success',`El id de la orden es: ${id}`)
                navigate('/')
            }).catch(error => {
                console.log(error)
                setNotification('error',`Algunos productos no tienen stock`)
            }).finally(() => {
                setLoading(false)
            })
    }
    
    if(loading) {
        return <h1>Generando orden...</h1>
    }

    if(getQuantity() === 0) {
        return (
            <h1>No hay items en el carrito</h1>
        )
    }

    return (     
        <div>
            <h1>Cart</h1>
            { cart.map(p => <CartItem key={p.id} {...p}/>) }
            <h3>Total: ${getTotal()}</h3>
            <button onClick={() => clearCart()} className="Button">Limpiar carrito</button>
            <button className="Button" onClick={createOrder}>Generar Orden</button>
        </div>
    )
}

export default Cart