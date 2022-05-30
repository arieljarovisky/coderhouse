import { Link } from "react-router-dom";
import "./item.css";

const Item = ({ id, name, price,img, handlePage }) => {
	return (
		<div className="row">
			<div className="col-md-4">
				<div className="Card CardItem">
                <img src={img} classname="card-img-top" alt={name}/>
					<div className="card-body">
						<h1 className="card-title">{name}</h1>
						<h2>${price}</h2>
						<Link to={`/detail/${id}`} className="Option btn btn-primary">
							Ver detalle
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
