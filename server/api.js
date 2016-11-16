'use strict';

const router = require('express').Router();
const watson =  require('watson-developer-cloud');
const authenticationObj = require('APP/watson-key');
const projectId = 'madhatterlibs';
const helpers = require('APP/utils/helpers')

const {organizeAnnotations} = helpers

var tone_analyzer = watson.tone_analyzer(authenticationObj);

router.post('/v3/tone', function(req, res, next){
	console.log("req.body: ", req.body)
	 tone_analyzer.tone({ text: req.body.message },
	  		function(err, tone) {
	    		if (err)
	      			console.log(err);
	    		else
	      			console.log(JSON.stringify(tone, null, 2));
	      			res.json(tone)
			})

})

// Set up auth
var gcloud = require('google-cloud')({
  credentials: require('APP/key.json'),
  projectId: projectId
});

var vision = gcloud.vision();
//console.log("VISION: ", vision)
var Language = gcloud.language
console.log("LANGUAGE: ", Language)
const languageClient = Language({
  credentials: require('APP/key.json'),
  projectId: projectId
});

router.post("/v1beta1/documents:annotateText", function(req, res, next){
	console.log("INPUT TEXT: ", req.body.inputText)

  languageClient.annotate(req.body.inputText, { verbose: true }, (err, annotations) => {
    if (err) {
      console.error(err);
      return;
    }

  
    //console.log('Annotations: ', annotations);
    //console.log('Annotations: %j ', annotations);
    //console.log('People: ', annotations.entities.people);
    //console.log('People mentions: ', annotations.entities.people[0].mentions);
    
    var data = organizeAnnotations(annotations)
    console.log(data.blanks)
    //console.log("DATA: ", data)
    // if(data instanceof Error){
    //   res.json({})
    // }
    // var textToChange = annotations.tokens
    // var words = [];
    // var POS = [];
    // var labels = [];
    // var entities = annotations.entities
    // textToChange.forEach(function(element){
    //   words.push(element.text.content)
    //   POS.push(element.partOfSpeech.tag)
    //   labels.push(element.dependencyEdge.label)
    // })
    // // MAKE HELPER FUNCTION FOR FIND VERBS, NOUNS, ETC
    // // Turn token json into one object with word : POS key/val pairs?
    // // make an array that is split by words
    // // make an array that has a POS corresponding to each word in the words arr
    // console.log("WORDS: ", words)
    // console.log("POS: ", POS)
    // // Make object that for each POS there is a key whose val is an array of idexes 
    // textToChange[0].text = "Donations"
    // console.log("textToChange: ", textToChange)
    // console.log("tokens: ", annotations.tokens)
    // var madlibText = words.slice(0)
    // madlibText[0] = 'changed'
    // console.log("madlibText: ", madlibText)
    // console.log("words array: ", words)
    //res.json({words, POS, labels, entities, madlibText})
    res.json(data)
  })
  //.then(res => console.log("annotateRes: ", res))

  //res.json({words, POS, labels, entities})

})

router.post("/submitComplete", function(req, res, next){
  console.log("REQUEST ON SUBMIT: ", req.body)
  var inputKeys = Object.keys(req.body)
  res.send(req.body)

})


module.exports = router;


  // var document = languageClient.document(req.body.inputText)
  // document.detectSentiment(function(err, sentiment) {
  //   if (err) {
  //       console.log(err);
  //       res.end('Cloud Natural Language Error: Sentiment');
  //     } else {
  //       console.log("SENTIMENT: ", sentiment)
  //     }
  //   // sentiment = 100 // Large numbers represent more positive sentiments.
  // });

  // // Parse the syntax of the document.
  // document.annotate(function(err, annotations) {
  //   if (err) {
  //       console.log(err);
  //       res.end('Cloud Natural Language Error: Annotate');
  //     } else {
  //       console.log("ANNOTATIONS: ", annotations)
  //       var textToChange = annotations.tokens
  //       var words = [];
  //       var POS = [];
  //       textToChange.forEach(function(element){
  //         words.push(element.text)
  //         POS.push(element.partOfSpeechTag)
  //       })
  //       // MAKE HELPER FUNCTION FOR FIND VERBS, NOUNS, ETC
  //       // Turn token json into one object with word : POS key/val pairs?
  //       // make an array that is split by words
  //       // make an array that has a POS corresponding to each word in the words arr
  //       console.log("WORDS: ", words)
  //       console.log("POS: ", POS)
  //       // Make object that for each POS there is a key whose val is an array of idexes 
  //       textToChange[0].text = "Donations"
  //       console.log("textToChange: ", textToChange)
  //       console.log("tokens: ", annotations.tokens)
  //     }
  // })
