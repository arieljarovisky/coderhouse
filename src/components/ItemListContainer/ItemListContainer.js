
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../services/firebase/firestore'
import { useFirestore } from '../../hooks/useFirestore'

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams()
    const { isLoading, data, error } = useFirestore(() => getProducts(categoryId), [categoryId])

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    if(error) {
        return <h1>Hubo un error</h1>
    }

    return(
        <div className='ItemListContainer'>
            <h1>{ greeting }</h1>
            { 
                data.length > 0 
                    ? <ItemList products={data} />
                    : <h2>No hay productos</h2>
            }
        </div>
    )
}

export default ItemListContainer