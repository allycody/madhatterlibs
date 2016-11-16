import {connect} from 'react-redux';
import Analyze from 'APP/app/components/Analyze'
import {setText, annotateText, setNumBlanks, clearStore} from '../reducers/text'


const mapStateToProps = ({completedText, blanks, inputText, completedAnalysis, inputAnalysis}) => ({completedText, blanks, inputText, completedAnalysis, inputAnalysis})
const mapDispatchToProps = dispatch => (
	{
		// setInputText(givenText){
		// 	console.log("in setInputText")
		// 	console.log("given text: ", givenText)
		// 	console.log("type: ", typeof givenText)
		// 	dispatch(setText(givenText))
		// },
		// fetchAnnotations(givenText){
		// 	dispatch(annotateText(givenText))
		// },

		// warningNoText(){
		// 	dispatch(setNumBlanks(0))
		// },

		// resetStore(){
		// 	dispatch(clearStore())
		// }
	});

export default connect(mapStateToProps, mapDispatchToProps)(Analyze)