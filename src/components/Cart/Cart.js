import { useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import { addDoc, collection, updateDoc, doc, getDocs, query, where, documentId, writeBatch } from "firebase/firestore";
import { db, collectionsName } from "../../services/firebase";
import { useNotification } from "../../notification/Notification";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Cart = () => {
	const [loading, setLoading] = useState(false);

	const { cart, clearCart, getTotal, getQuantity } = useContext(CartContext);

	const { setNotification } = useNotification();

	const navigate = useNavigate();

    const [data, setDatos] = useState({
        nombre:'',
        email:'',
        telefono:'',
        direccion:'',
    })

    const handelInputChange = (e)=>{
        setDatos({
            ...data,
            [e.target.name] : e.target.value 
        })
    }

	const Formulario = () => {
		const { register, handleSubmit } = useForm();

	

		return (
			<div>
				<h2>Complete sus datos para completar la compra</h2>

				<form onSubmit={handleSubmit(createOrder)}>
					<div>
						<label id="Nombre">Nombre</label>
						<input type="text" {...register("nombre")} onChange={handelInputChange} value={data.nombre} name="nombre" id="nombre" required />
					</div>
					<div>
						<label id="Email">Email</label>
						<input type="email" {...register("email")} onChange={handelInputChange} value={data.email} name="email" id="email" required />
					</div>
					<div>
						<label id="Telefono">Telefono</label>
						<input type="number" {...register("telefono")} onChange={handelInputChange}  value={data.telefono} name="telefono" id="Telefono" required />
					</div>
					<div>
						<label id="Direccion">Direccion</label>
						<input type="text" {...register("direccion")} onChange={handelInputChange} value={data.direccion} name="direccion" id="Direccion" required />
					</div>
					<input type="submit" value="enviar" />
				</form>
			</div>
		);
	};
	const createOrder = () => {
		setLoading(true);

		const objOrder = {
			clientes:data,
			items: cart,
			total: getTotal(),
		};

		const ids = cart.map((prod) => prod.id);

		const batch = writeBatch(db);

		const outOfStock = [];

		const collectionRef = collection(db, "products");

		getDocs(query(collectionRef, where(documentId(), "in", ids)))
			.then((response) => {
				response.docs.forEach((doc) => {
					const dataDoc = doc.data();
					const prodQuantity = cart.find((prod) => prod.id === doc.id)?.quantity;

					if (dataDoc.stock >= prodQuantity) {
						batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity });
					} else {
						outOfStock.push({ id: doc.id, ...dataDoc });
					}
				});
			})
			.then(() => {
				if (outOfStock.length === 0) {
					const collectionRef = collection(db, "orders");
					return addDoc(collectionRef, objOrder);
				} else {
					return Promise.reject({ type: "out_of_stock", products: outOfStock });
				}
			})
			.then(({ id }) => {
				batch.commit();
				clearCart();
				setNotification("success", `El id de la orden es: ${id}`);
				navigate("/");
			})
			.catch((error) => {
				setNotification("error", `Algunos productos no tienen stock`);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (loading) {
		return <h1>Generando orden...</h1>;
	}

	if (getQuantity() === 0) {
		return <h1>No hay items en el carrito</h1>;
	}

	return (
		<div>
			<h1>Cart</h1>
			{cart.map((p) => (
				<CartItem key={p.id} {...p} />
			))}
			<h3>Total: ${getTotal()}</h3>
			<button onClick={() => clearCart()} className="Button">
				Limpiar carrito
			</button>
			<Formulario />
		</div>
	);
};

export default Cart;
