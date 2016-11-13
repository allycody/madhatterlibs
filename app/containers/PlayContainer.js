import {connect} from 'react-redux';
import Play from 'APP/app/components/Play'
import {setText, annotateText} from '../reducers/text'


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
		}
	});

export default connect(mapStateToProps, mapDispatchToProps)(Play)