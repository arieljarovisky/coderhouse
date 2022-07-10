
import { useForm } from "react-hook-form";
import createOrder from '../Cart/Cart'
const Formulario = () => {
	const { register, handleSubmit } = useForm();


	return (
		<div>
			<h2>Complete sus datos para completar la compra</h2>

			<form onSubmit={handleSubmit(createOrder)}>
				<div>
					<label id="Nombre">Nombre</label>
					<input type="text" {...register('nombre')} name="nombre" id="nombre" />
				</div>
				<div>
					<label id="Email">Email</label>
					<input type="email" {...register('email')} name="email" id="email" />
				</div>
				<div>
					<label id="Telefono">Telefono</label>
					<input type="number" {...register('telefono')} name="telefono" id="Telefono" />
				</div>
				<div>
					<label id="Direccion">Direccion</label>
					<input type="text" {...register('direccion')} name="direccion" id="Direccion" />
				</div>
                <input type="submit" value="enviar"/>
			</form>
		</div>
	);
};

export default Formulario