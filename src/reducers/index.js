import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import { categories } from './categoriesReducer';
import { categoryImages } from './categoryImagesReducer';

export default history => combineReducers({
	router: connectRouter(history),
	categoriesData: categories,
	categoryImagesData: categoryImages,
});
