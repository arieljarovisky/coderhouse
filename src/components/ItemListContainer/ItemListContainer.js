
import { useState, useEffect } from 'react'
import { getProducts } from '../../asymock'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { getProductsByCategory } from '../../asymock'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true)

        if(!categoryId) {
            getProducts().then(response => {
                setProducts(response)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            getProductsByCategory(categoryId).then(response => {
                setProducts(response)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [categoryId])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return(
        <div className='ItemListContainer'>
            <h1>{ greeting }</h1>
            { 
                products.length > 0 
                    ? <ItemList products={products} />
                    : <h2>No hay productos</h2>
                }
        </div>
    )
}

export default ItemListContainer