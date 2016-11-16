import { combineReducers } from 'redux'
import {inputText, words, POS, labels, entities, madlibText, numBlanks, blanks, inputAnalysis, completedAnalysis} from './text';

const initialState = {};


const rootReducer = combineReducers({
	inputText,
	words, 
	POS,
	labels,
	entities,
	madlibText,
	numBlanks,
	blanks,
	completedAnalysis,
	inputAnalysis
});



export default rootReducer
