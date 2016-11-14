import {connect} from 'react-redux';
import Original from 'APP/app/components/Original'
import {setText, annotateText, setNumBlanks, clearStore} from '../reducers/text'


const mapStateToProps = ({inputText}) => ({inputText})
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

		warningNoText(){
			dispatch(setNumBlanks(0))
		},

		resetStore(){
			dispatch(clearStore())
		}
	});

export default connect(mapStateToProps, mapDispatchToProps)(Original)