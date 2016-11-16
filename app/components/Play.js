import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import axios from 'axios'
import {Button} from 'react-mdl'
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



export default class Play extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount(){
		this.props.resetStore()
	}

	handleSubmit(e){
		e.preventDefault();
	  	console.log("SUBMITTED")

	  	var inputText = e.target.inputText.value;
	  	console.log(inputText)
	  	if(!inputText){
	  		console.log("no text submitted")
	  		this.props.warningNoText()
	  	}
	  	else{
		  	this.props.setInputText(inputText)
		  	this.props.fetchAnnotations(inputText)
		}

	 //  	axios.post("/api/v1beta1/documents:annotateText", {inputText})
		// .then(res => res.data)
		// .then(res => console.log("RES: ", res))

		browserHistory.push('/madlib')
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
    <h4>Play with the Mad Hatter</h4>
    
      <div className="row">
       
          <Button raised style={{margin: "0 0 30px 0"}} onClick={()=>{browserHistory.push('/play')}}> Make your own! </Button>
          <Button raised style={{margin: "0 0 30px 0"}}> Try one of ours! </Button>
       
      </div>

  </div>
     
			)
	}


 }

// return(
//       <div>
//         PLAY WITH THE MAD HATTER

//         <form onSubmit={this.handleSubmit}>
//         	<label>Text to analyze </label>
//         	<textarea name="inputText" rows="30" cols="30"/>
//         	<div style={{padding: "20px 0"}}>
// 				<Button raised type='submit' value='Submit' style={{display: "block"}}>Submit</Button>
// 			</div>
// 		</form>
// 		<Button raised style={{margin: "0 0 30px 0"}}> Try one of ours! </Button>
//      <h1>Elegant Contact Form</h1>
// 		<form className="cf">
// 		  <div className="half left cf">
// 		    <input type="text" id="input-name" placeholder="Name"/>
// 		    <input type="email" id="input-email" placeholder="Email address"/>
// 		    <input type="text" id="input-subject" placeholder="Subject"/>
// 		  </div>
// 		  <div className="half right cf">
// 		    <textarea name="message" type="text" id="input-message" placeholder="Message"></textarea>
// 		  </div>  
// 		  <input type="submit" value="Submit" id="input-submit"/>
// 		</form>

//       </div>
// 			)




