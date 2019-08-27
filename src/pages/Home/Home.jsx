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
export class Home extends Component {
  state = {
    categories: [],
    categoryImages: {},
    currentCategoryId: null,
    currentPage: 1,
    pending: false,
    loadMorePending: false
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
      match: { params },
    } = this.props;

    this.setState({ pending: true })

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
            currentCategoryId: categoryId,
            pending: false
          });
  
          // get default category images
          this.handleGetCategoryImages(categoryId, 1);
        }
      });
  }

  /**
   * React component life cycle hook
   *
   * @memberof Home
   * @return {JSX} - home page
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      match: { params },
      getCategoryImages,
    } = this.props;

    if (prevProps.match.params.category_id !== params.category_id) {
      this.setState({ pending: true })

      // get category images
      getCategoryImages(10, params.category_id, 1)
        .then(()=> {
          const { categoryImagesData } = this.props;
          
          this.setState({
            categoryImages: categoryImagesData,
            currentCategoryId: params.category_id,
            pending: false
          });
        })
    }

    return null;
  }

  /**
   * openMobileMenu - Opens Mobile Menu
   *
   * @memberof Home
   */
  openMobileMenu = () => {
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
   * handleLoadMore - Loads more images
   *
   * @memberof Home
   */
  handleLoadMore = () => {
    const { getCategoryImages } = this.props;
    const { currentCategoryId } = this.state;
    let { currentPage, categoryImages } = this.state;

    this.setState({ loadMorePending: true })

    currentPage += 1;

    // get category images
    getCategoryImages(10, currentCategoryId, currentPage)
    .then(() => {
      const {
        categoryImagesData
      } = this.props;

      categoryImages.data  = categoryImages.data.concat(categoryImagesData.data);

      this.setState({
        categoryImages,
        currentPage,
        loadMorePending: false
      });
    });
  }

  /**
   * handleGetCategoryImages - Calls getCategoryImages action
   *
   * @memberof Home
   */
  handleGetCategoryImages = (categoryId, page=1) => {
    const { getCategoryImages } = this.props;
    
    this.setState({ pending: true })

    // get category images
    getCategoryImages(10, categoryId, page)
    .then(() => {
      const {
        categoryImagesData
      } = this.props;

      this.setState({
        categoryImages: categoryImagesData,
        pending: false
      });
    });
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
      pending,
      loadMorePending
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
          pending={pending}
          loadMorePending={loadMorePending}
          categoryImages={categoryImages.data}
          handleLoadMore={this.handleLoadMore}
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
