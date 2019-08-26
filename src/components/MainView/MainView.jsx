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
  categoryImages,
  handleLoadMore,
  loadMorePending,
}) => (
  <div id="main-view">
    {
      pending && <div className="loader"></div>
    }

    {
      !pending && categoryImages && categoryImages.map((categoryImage, index) => {
        const data = <div
          key={index}
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

    {
      !pending && categoryImages && categoryImages.length > 0 && (
        <div>
          <button
            type="button"
            className="load-more-btn"
            onClick={handleLoadMore}
          >
            {
              !loadMorePending && <p>Load more Images...</p>
            }

            {
              loadMorePending && <div className="loader loader-pending"></div>
            }
          </button>
        </div>
      )
    }
  </div>
);

export default MainView;
