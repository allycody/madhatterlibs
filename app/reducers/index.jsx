import { combineReducers } from 'redux'
import {inputText, words, POS, labels, entities, madlibText} from './text';

const initialState = {};


const rootReducer = combineReducers({
	inputText,
	words, 
	POS,
	labels,
	entities,
	madlibText
});



export default rootReducer
