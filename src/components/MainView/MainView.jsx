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
  pending,
  categoryImages
}) => (
  <div id="main-view">
    {
      pending && <div className="loader"></div>
    }

    {
      !pending && categoryImages && categoryImages.map(categoryImage => {
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

    {
      !pending && categoryImages && categoryImages.length <= 0 && (
        <div>Sorry!!! No cats found</div>
      )
    }
  </div>
);

export default MainView;
