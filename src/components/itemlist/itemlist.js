
import Item from '../item/item'

const Itemlist = ({products}) => {
    return (
        <div className='container'>
        <div className='card'>
            {products.map(prod => <Item key={prod.id} {...prod}/>)}
            
        </div>
        </div>
    )
}

export default Itemlist