// react library
import React from 'react';

// styles
import './Sidebar.scss';

/**
 * Renders MenuItems component
 * @param {object} props - component props
 * @returns {JSX} JSX
 */
const MenuItems = ({
  name
}) => (
  <div className="menu-items">
    <i className="fas fa-cat menu-cat-icon"></i>
    <p className="menu-item-name">{name}</p>
  </div>
);

export default MenuItems;
