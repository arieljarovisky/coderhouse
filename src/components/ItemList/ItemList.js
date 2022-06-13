import { memo } from 'react'
import Item from '../Item/Item'

const ItemList = ({products}) => {
    return (
        <div>
            {products.map(prod => <Item key={prod.id} {...prod} />)}
        </div>
    )
}

export default memo(ItemList, (prevProps, nextProps) => {
    return true
})