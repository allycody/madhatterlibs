import {connect} from 'react-redux';
import Results from 'APP/app/components/Results'
import {setText, annotateText, clearStore, analyzeResults} from '../reducers/text'


const mapStateToProps = ({inputText, madlibText, POS, words, entities, numBlanks, labels, blanks}) => ({inputText, madlibText, POS, words, entities, numBlanks, labels, blanks})
const mapDispatchToProps = dispatch => (
	{
		setInputText(givenText){
			console.log("in setInputText")
			console.log("given text: ", givenText)
			console.log("type: ", typeof givenText)
			dispatch(setText(givenText))
		},
		fetchAnnotations(givenText){
			dispatch(annotateText(givenText))
		},
		resetStore(){
			dispatch(clearStore())
		},

		analyzeInputs(inputText, completedText){
			dispatch(analyzeResults(inputText, completedText))

		}

	});

export default connect(mapStateToProps, mapDispatchToProps)(Results)