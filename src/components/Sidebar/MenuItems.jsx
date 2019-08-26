// react library
import React from 'react';
import { Link } from 'react-router-dom';

// styles
import './Sidebar.scss';

/**
 * Renders MenuItems component
 * @param {object} props - component props
 * @returns {JSX} JSX
 */
const MenuItems = ({
  id,
  name
}) => (
  <Link
    to={`/${id}`}
    className="links"
  >
    <div className="menu-items">
      <i className="fas fa-cat menu-cat-icon"></i>
      <p className="menu-item-name">{name}</p>
    </div>
  </Link>
);

export default MenuItems;
