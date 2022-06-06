
import Item from '../Item/Item'

const ItemList = ({products, handlePage}) => {
    return (
        <div>
            {products.map(prod => <Item key={prod.id} {...prod} handlePage={handlePage}/>)}
        </div>
    )
}

export default ItemList