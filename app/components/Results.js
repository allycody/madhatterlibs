import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import axios from 'axios'
import { Textfield } from 'react-mdl'
// import gCloud from 'google-cloud'
// import Language from '@google-cloud/language'

// const projectId = 'madhatterlibs'

// // Set up auth
// var gcloud = gCloud({
//   keyFilename: 'APP/key.json',
//   projectId: projectId
// });

// //var vision = gcloud.vision();
// //console.log("VISION: ", vision)
// // var Language = gcloud.language
// const languageClient = Language({
//   keyFilename: 'APP/key.json',
//   projectId: projectId
// });



export default class Results extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.getPOS = this.getPOS.bind(this)
	}

	getPOS(idx){
		console.log("this: ", this)
		return this.props.POS[idx]
	}

	handleSubmit(e){
		e.preventDefault();
	  	console.log("SUBMITTED MADLIB FORM")

	  
	 //  	var document = languageClient.document(e.target.inputText.value);

	 //  	// Analyze the sentiment of the document.
	 //  	document.detectSentiment(function(err, sentiment) {
	 //  		if (err) {
		//   		console.log(err);
		// 	    res.end('Cloud Natural Language Error: Sentiment');
		// 	} else {
		// 	    console.log("SENTIMENT: ", sentiment)
		// 	}
		// 	  // sentiment = 100 // Large numbers represent more positive sentiments.
		// });

		// // Parse the syntax of the document.
		// document.annotate(function(err, annotations) {
		//   	if (err) {
		//       	console.log(err);
		//       	res.end('Cloud Natural Language Error: Annotate');
		//     } else {
		//       	console.log("ANNOTATIONS: ", annotations)
		//       	var textToChange = annotations.tokens
		// 	    var words = [];
		// 	    var POS = [];
		// 	    textToChange.forEach(function(element){
		// 	    	words.push(element.text)
		// 	        POS.push(element.partOfSpeechTag)
		// 	    })
		//       // MAKE HELPER FUNCTION FOR FIND VERBS, NOUNS, ETC
		//       // Turn token json into one object with word : POS key/val pairs?
		//       // make an array that is split by words
		//       // make an array that has a POS corresponding to each word in the words arr
		//       	console.log("WORDS: ", words)
		//       	console.log("POS: ", POS)
		//       // Make object that for each POS there is a key whose val is an array of idexes 
		//       	textToChange[0].text = "Donations"
		//       	console.log("textToChange: ", textToChange)
		//       	console.log("tokens: ", annotations.tokens)
		//     }

		//   // annotations = {
		//   //   language: 'en',
		//   //   sentiment: 100,
		//   //   entities: {},
		//   //   sentences: ['Contributions welcome!'],
		//   //   tokens: [
		//   //     {
		//   //       text: 'Contributions',
		//   //       partOfSpeech: 'Noun (common and proper)',
		//   //       partOfSpeechTag: 'NOUN'
		//   //     },
		//   //     {
		//   //       text: 'welcome',
		//   //       partOfSpeech: 'Verb (all tenses and modes)',
		//   //       partOfSpeechTag: 'VERB'
		//   //     },
		//   //     {
		//   //       text: '!',
		//   //       partOfSpeech: 'Punctuation',
		//   //       partOfSpeechTag: 'PUNCT'
		//   //     }
		//   //   ]
		//   // }
		// });
	}

	render(){

    //upload a file
		return(
      <div>
      <div style={{padding: "60px 0px 0px 0px"}}>
        FILL THIS OUT
        </div>

        <form onSubmit={this.handleSubmit}>
        	 {this.props.madlibText.map(function(word, idx){
        	 	if(typeof word === "object"){
        	 		return (
        	 			<Textfield key={idx}
			    			onChange={() => {}}
			    			label={this.getPOS(idx)}
			    			style={{width: '100px', display: "inline-block", padding: "0px, 3px, 0px, 3px"}}
						>
							<i className="material-icons mdl-textfield__label__icon">
								{word.punc}
							</i>		
						</Textfield> 
			        )
        	 	}
        	 	return word + " "
        	 }, this)} 
        	<div style={{padding: "20px 0"}}>
				<input type='submit' value='Submit' style={{display: "block"}}/>
			</div>
		</form>
		<Button raised onClick={() => {browserHistory.push('/play')}}>Button</Button>
		<button onClick={() => {browserHistory.push('/play')}}> Make Another </button>
      </div>
			)
	}

// 	renderLoginSignup(){
// 		return(
// 			<ul className="nav navbar-nav navbar-right">
// 			<li><Link to="/login" activeClassName="active"> Login </Link></li>
// 			</ul>
// 			)
// 	}

// 	renderLogout(){
// 		return (
//       	<ul className="nav navbar-nav navbar-right">
//         <WhoAmI/>
//       	</ul>
//     )

// 	}
 }
