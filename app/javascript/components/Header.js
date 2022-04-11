import React from "react";
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="text-center">
    <Link to="/">
      <h1 className="header-title">PickOne!</h1>
    </Link>
    <h2 className="header-sub-title">The simplest way to choose someone randomly</h2>
  </div>
);


export default Header;