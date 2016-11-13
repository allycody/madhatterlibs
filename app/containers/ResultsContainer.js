import {connect} from 'react-redux';
import Results from 'APP/app/components/Results'
import {setText, annotateText} from '../reducers/text'


const mapStateToProps = ({inputText, madlibText, POS, words, entities}) => ({inputText, madlibText, POS, words, entities})
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
		}
	});

export default connect(mapStateToProps, mapDispatchToProps)(Results)