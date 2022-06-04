import React from "react";
import "./App.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import ItemCount from "./components/CountFunction/CountFunction";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<ItemListContainer greeting="Todos los Productos" />} />
					<Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos filtrados por categoria" />} />
					<Route path="/detail/:productId" element={<ItemDetailContainer />} />
					<Route path="/about" element={<h1>About</h1>} />
					<Route path="*" element={<h1>PAGE NOT FOUND 404</h1>} />
				</Routes>
			</BrowserRouter>
			<ItemCount />
		</div>
	);
}

export default App;
