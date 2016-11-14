import axios from 'axios'

// ACTIONS

const SET_TEXT = 'SET_TEXT';
const SET_WORDS = 'SET_WORDS';
const SET_POS = 'SET_POS';
const SET_LABELS = 'SET_LABELS';
const SET_ENTITIES = 'SET_ENTITIES';
const SET_MADLIB = 'SET_MADLIB';
const SET_NUMBLANKS = 'SET_NUMBLANKS';
const SET_COMPLETE = 'SET_COMPLETE';

//-------------------------------------------------------------------------

//ACTION CREATORS

export const setText = (inputText) => {
	console.log("in setText action creator")
	return ({
		type: SET_TEXT,
		inputText
	})
}

export const setMadlibText = (madlibText) => {
	console.log("in setText action creator")
	return ({
		type: SET_MADLIB,
		madlibText
	})
}

export const setWords = (words) => {
	console.log("in setWords action creator")
	return ({
		type: SET_WORDS,
		words
	})
}

export const setPOS = (POS) => {
	console.log("in setPOS action creator")
	return ({
		type: SET_POS,
		POS
	})
}

export const setLabels = (labels) => {
	console.log("in setLabels action creator")
	return ({
		type: SET_LABELS,
		labels
	})
}

export const setEntities = (entities) => {
	console.log("in setentities action creator")
	return ({
		type: SET_ENTITIES,
		entities
	})
}

export const setNumBlanks = (numBlanks) => {
	console.log("setting numBlanks to: ", numBlanks)
	return ({
		type: SET_NUMBLANKS,
		numBlanks
	})
}

export const setComplete = (complete) => {
	console.log("in setentities action creator")
	return ({
		type: SET_COMPLETE,
		complete
	})
}


//-------------------------------------------------------------------------

//ITEMS REDUCER

// this is an empty reducer so things don't break when we combineReducers

export function inputText(inputText = '', action) {
	console.log("ACTION: ", action)
	switch(action.type) {
		case 'SET_TEXT':
			return action.inputText
		default:
			return inputText;
	}
}

export function madlibText(madlibText = [], action) {
	console.log("ACTION: ", action)
	switch(action.type) {
		case 'SET_MADLIB':
			return action.madlibText
		default:
			return madlibText;
	}
}

export function words(words = [], action) {
	console.log("ACTION: ", action)
	switch(action.type) {
		case 'SET_WORDS':
			return action.words
		default:
			return words;
	}
}

export function POS(POS = [], action) {
	console.log("ACTION: ", action)
	switch(action.type) {
		case 'SET_POS':
			return action.POS
		default:
			return POS;
	}
}

export function labels(labels = [], action) {
	console.log("ACTION: ", action)
	switch(action.type) {
		case 'SET_LABELS':
			return action.labels
		default:
			return labels;
	}
}

export function entities(entities = {}, action) {
	console.log("ACTION: ", action)
	switch(action.type) {
		case 'SET_ENTITIES':
			return action.entities
		default:
			return entities;
	}
}

export function numBlanks(numBlanks = null, action) {
	console.log("ACTION: ", action)
	switch(action.type) {
		case 'SET_NUMBLANKS':
			return action.numBlanks
		default:
			return numBlanks;
	}
}

export function complete(complete = 0, action) {
	console.log("ACTION: ", action)
	switch(action.type) {
		case 'SET_COMPLETE':
			return action.complete
		default:
			return complete;
	}
}

//-------------------------------------------------------------------------

// DISPATCHERS

export const annotateText = (inputText) => ((dispatch) => {
	console.log("dispatching items")
	axios.post("/api/v1beta1/documents:annotateText", {inputText})
		.then(res => res.data)
		.then(res => {
			dispatch(setWords(res.words))
			dispatch(setPOS(res.POS))
			dispatch(setLabels(res.labels))
			dispatch(setEntities(res.entities))
			dispatch(setMadlibText(res.madlibText))
			dispatch(setNumBlanks(res.numBlanks))
			dispatch(setComplete(1))
		})
})

export const clearStore = () => ((dispatch) => {
	dispatch(setWords(''))
	dispatch(setPOS([]))
	dispatch(setLabels([]))
	dispatch(setEntities({}))
	dispatch(setMadlibText([]))
	dispatch(setNumBlanks(null))
	dispatch(setComplete(0))
})

export const fetchItemById = (itemId) => ((dispatch) => {
	axios.get('/api/items/${itemId}')
    .then(res => res.data)
    .then(items => dispatch(getItems(items)));
})





