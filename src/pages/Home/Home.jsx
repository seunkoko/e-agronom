// react library
import React, { Component } from 'react';

// third-party libraries
import { connect } from 'react-redux';

// actions
import { getCategories } from '../../actions/categoriesAction';
import { getCategoryImages } from '../../actions/categoryImagesAction';

// components
import MainView from '../../components/MainView/MainView';
import Sidebar from '../../components/Sidebar/Sidebar';

// styles
import './Home.scss';

/**
 * Home Component
 *
 * @class Home
 * @extends {React.Component}
 */
class Home extends Component {
  state = {
    categories: [],
    categoryImages: this.props.categoryImagesData,
    currentCategoryId: null,
  }

  /**
   * React component life cycle hook
   *
   * @memberof Home
   * @param {object} props - Props
   * @param {object} state - State
   * @return {void} - no return
   */
  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { match: { params } } = nextProps;
    const { currentCategoryId, categoryImages } = prevState;

    if (nextProps.categoryImagesData !== categoryImages) {
      return {
        categoryImages: nextProps.categoryImagesData
      }
    }

    
    if (params.category_id && params.category_id !== currentCategoryId) {
      const { getCategoryImages } = nextProps;

      // get category images
      getCategoryImages(10, params.category_id, 1)

      return {
        currentCategoryId: params.category_id,
      };
    }

    return null;
  }

  /**
   * React component life cycle hook
   *
   * @memberof Home
   * @return {JSX} - home page
   */
  componentDidMount() {
    const {
      getCategories,
      getCategoryImages,
      match: { params },
    } = this.props;

    // get default categories
    getCategories()
      .then(() => {
        const {
          categoriesData
        } = this.props;

        const categoryId = "category_id" in params ? params.category_id : categoriesData.data[0].id;

        if (categoriesData.data.length > 0) {
          this.setState({
            categories: categoriesData,
            currentCategoryId: categoryId
          });
  
          // get default category images
          getCategoryImages(10, categoryId, 1)
          .then(() => {
            const {
              categoryImagesData
            } = this.props;
    
            this.setState({
              categoryImages: categoryImagesData
            });
          });
        }
      });
  }

  /**
   * openMobileMenu - Opens Mobile Menu
   *
   * @memberof Home
   */
  openMobileMenu() {
    const sidebar = document.getElementById("sidebar-id");
    const sidebarIcon = document.getElementById("open-sidebar-icon");
    const sidebarContent = document.getElementById("sidebar-content");
    
    if (sidebar.classList.contains('mobile-style')) {
      sidebar.classList.remove("mobile-style");

      sidebarIcon.classList.remove("fa-times-circle");
      sidebarIcon.classList.add("fa-arrow-right");
      sidebarContent.classList.add("hide-on-phone");
    } else {
      sidebar.classList.add("mobile-style");

      sidebarIcon.classList.remove("fa-arrow-right");
      sidebarIcon.classList.add("fa-times-circle");
      sidebarContent.classList.remove("hide-on-phone");
    }
  }

  /**
   * Renders Home component
   * @param {object} props - component props
   * @returns {JSX} JSX
   */
  render() {
    const {
      categories,
      categoryImages,
    } = this.state;

    return (
      <div id="main-body">
        {/* sidebar */}
        <Sidebar
          categories={categories.data}
          openMobileMenu={this.openMobileMenu}
        />

        {/* mainview */}
        <MainView
          pending={categoryImages.pending}
          categoryImages={categoryImages.data}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  categoriesData,
  categoryImagesData,
}) => ({
  categoriesData,
  categoryImagesData, 
});

export default connect(mapStateToProps, {
  getCategories,
  getCategoryImages
})(Home);
