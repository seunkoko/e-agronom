// react library
import React from 'react';

// components
import MenuItems from './MenuItems';

// styles
import './Sidebar.scss';

/**
 * Renders Sidebar component
 * @param {object} props - component props
 * @returns {JSX} JSX
 */
const Sidebar = ({
  openMobileMenu,
  categories
}) => (
  <div id="sidebar-id" className="sidebar">
    <div className="show-on-phone">
      <i
        id="open-sidebar-icon"
        className="fas fa-arrow-right open-sidebar"
        onClick={openMobileMenu}
      >
      </i>
    </div>

    <div id="sidebar-content" className="hide-on-phone">
      <h2 className="sidebar-title">
        CATEGORIES
      </h2>

      {
        categories && categories.map(category => {
          const item = <MenuItems
            key={category.id}
            id={category.id}
            name={category.name}
          />
          return item;
        })
      }
    </div>
  </div>
);

export default Sidebar;
