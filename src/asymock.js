const products = [
	{
		id: '1',
		name: "Remera estampada",
		price: 1000,
		category:'remeras',
		img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/417/567/products/274f4344-85ab-45ff-990a-0ba20c8ca9d61-fcb9bd8870816f97b716324474060898-1024-1024.jpeg",
		stock: 13,
		description: "Una remera estampada",
	},
	{
		id: '2',
		name: "Pantalon Jogger",
		price: 300,
		category: 'pantalones',
		img: "https://s7g3.scene7.com/is/image/soloinvest/n83030A?$big_image_web$",
		stock: 16,
		description: "Pantalon Jogger Gris",
	},
];

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const getProductsById = (id) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === id))
        }, 500)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        },500)
    })
}