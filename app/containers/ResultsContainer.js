import {connect} from 'react-redux';
import Results from 'APP/app/components/Results'
import {setText, annotateText, clearStore} from '../reducers/text'


const mapStateToProps = ({inputText, madlibText, POS, words, entities, numBlanks}) => ({inputText, madlibText, POS, words, entities, numBlanks})
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

	});

export default connect(mapStateToProps, mapDispatchToProps)(Results)