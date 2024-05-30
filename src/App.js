// Filename - App.js

import React from "react";
import Navbar from "./components/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import TypeTest from "./pages/typetest";
import CheckList from "./pages/checklist";


function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route
					path="/typetest"
					element={<TypeTest />}
				/>
        <Route
          path="/checklist"
          element={<CheckList/>}
        />
			</Routes>
		</Router>
	);
}

export default App;
