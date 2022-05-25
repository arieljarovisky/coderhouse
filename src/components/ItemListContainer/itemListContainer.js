

import { useState, useEffect } from 'react'
import { getProducts } from '../../asymock'
import Itemlist from '../itemlist/itemlist'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then(response => {
            setProducts(response)
        })
    }, [])
   
    console.log('antes de montar')

    return(
        <div className='ItemListContainer'>
            <h1>{ greeting }</h1>
            <Itemlist products={products}/>
        </div>
    )
}

export default ItemListContainer