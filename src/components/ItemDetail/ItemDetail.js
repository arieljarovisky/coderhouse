const ItemDetail = ({ name, price, img }) => {
    return(
        <div className="Card CardItem">
        <img src={img} classname="card-img-top" alt={name}/>
            <div className="card-body">
                <h1 className="card-title">{name}</h1>
                <h2>${price}</h2>
               
               
            </div>
        </div>
        
    )
}

export default ItemDetail