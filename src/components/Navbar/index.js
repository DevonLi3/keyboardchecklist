// Filename - "./components/Navbar.index.js

import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/about" activeStyle>
						About
					</NavLink>
                    <NavLink to="/typetest" activeStyle>
						TypeTest
					</NavLink>
                    <NavLink to="/checklist" activeStyle>
						CheckList
					</NavLink>
                    
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
