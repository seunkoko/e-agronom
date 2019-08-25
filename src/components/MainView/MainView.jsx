// react library
import React from 'react';

// styles
import './MainView.scss';

/**
 * Renders MainView component
 * @param {object} props - component props
 * @returns {JSX} JSX
 */
const MainView = ({
  categoryImages
}) => (
  <div id="main-view">
    {
      categoryImages && categoryImages.map(categoryImage => {
        const data = <div
          key={categoryImage.id}
          className="cat-display"
        >
          <img
            className="image-display"
            src={categoryImage.url}
            alt="img"
          />
        </div>
        return data;
      })
    }
  </div>
);

export default MainView;
