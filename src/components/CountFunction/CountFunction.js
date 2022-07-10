import { useState, useEffect } from 'react'

const CountFunction = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
    }, [])

    const decrement = () => {
      
            setCount((count) => count - 1)
        
    }

    const increment = () => {
        setCount(count + 1)
    }


    return(
        <div className='cajacontenedora'>
        <div className='container caja'>
            <button className='boton' onClick={decrement}>-</button>
            <h1>{count}</h1>
            <button className='boton' onClick={increment}>+</button> 
        </div>
        <button className='boton'>Agregar al carrito</button>
        </div>
    )
}

export default CountFunction