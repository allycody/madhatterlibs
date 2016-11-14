import { combineReducers } from 'redux'
import {inputText, words, POS, labels, entities, madlibText, numBlanks, complete} from './text';

const initialState = {};


const rootReducer = combineReducers({
	inputText,
	words, 
	POS,
	labels,
	entities,
	madlibText,
	numBlanks,
	complete
});



export default rootReducer
