// react library
import React, { Component } from 'react';
import logo from './logo.svg';

// third-party libraries
import { connect } from 'react-redux';

// actions
import { getCategories } from '../../actions/categoriesAction';
import { getCategoryImages } from '../../actions/categoryImagesAction';

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
    categoryImages: [],
  }

  /**
   * React component life cycle hook
   *
   * @memberof Home
   * @return {JSX} - home page
   */
  componentDidMount() {
    const { getCategories } = this.props;

    getCategories()
      .then(() => {
        const {
          categoriesData
        } = this.props;

        this.setState({
          categories: categoriesData
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
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
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
