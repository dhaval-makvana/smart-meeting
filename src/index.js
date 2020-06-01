import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { initialDataBuildings } from './data';


localStorage.setItem('data', JSON.stringify(initialDataBuildings));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
