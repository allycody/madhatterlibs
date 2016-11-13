// Select and replace word helpers

function organizeAnnotations(annotations){
	var textToChange = annotations.tokens
    var words = [];
    var POS = [];
    var labels = [];
    var entities = annotations.entities;
    var POSindexes = {};
    var punctCount = 0;
    textToChange.forEach(function(element, idx){
    	var word = element.text.content;
    	var POStag = element.partOfSpeech.tag;
    	var label = element.dependencyEdge.label
    	var labelsToIgnore = ['POSS', 'NEG', 'AUX', 'CCOMP']
    	var POStoIgnore = ['CONJ', 'PRON']
    	// generate arrays of the words, POS, and labels
    	// so they corresponding words and their tags can 
    	// be accessed by index
    	if(POStag === 'PUNCT' || (label === 'NEG' && word.indexOf("'") !== -1)){
    		words[words.length-1] += element.text.content
    		punctCount++;
    	}
    	else{
	      	words.push(word)
	      	POS.push(POStag)
	      	labels.push(label)

	      	// make a property for each POS
	    	// the value of that key will be an array of
	    	// indices that point to words with that POS tag
		    if(labelsToIgnore.indexOf(label) !== -1 || POStoIgnore.indexOf(POStag) !== -1){
		    	//do nothing
		    }
		    else{
		      	if(POSindexes[element.partOfSpeech.tag]){
		      		console.log("id: ", idx)
		      		console.log("punctCount: ", punctCount)
		    		POSindexes[element.partOfSpeech.tag].push(idx - punctCount)
		    	}
		    	else{
		    		console.log("id: ", idx)
		      		console.log("punctCount: ", punctCount)
		    		POSindexes[element.partOfSpeech.tag] = [idx - punctCount]
		    	}
		}}
    })
    // MAKE HELPER FUNCTION FOR FIND VERBS, NOUNS, ETC
    // Turn token json into one object with word : POS key/val pairs?
    // make an array that is split by words
    // make an array that has a POS corresponding to each word in the words arr
    console.log("WORDS: ", words)
    console.log("POS: ", POS)
    // Make object that for each POS there is a key whose val is an array of idexes 
    textToChange[0].text = "Donations"
    console.log("textToChange: ", textToChange)
    console.log("tokens: ", annotations.tokens)
    var madlibText = words.slice(0)
    madlibText = generateBlanks(madlibText, POSindexes)
    console.log("madlibText: ", madlibText)
    console.log("words array: ", words)
    return {words, POS, labels, entities, madlibText}
}

function generateBlanks(madlibText, POSindexes){
	console.log("POSindexes objext: ", POSindexes)
	//{NOUN, VERB, ADV} = POSindexes;
	var noun = POSindexes.NOUN
	var verb = POSindexes.VERB
	var adv = POSindexes.ADV
	console.log("VERB BEFORE: ", verb)
	noun = shuffle(noun);
	verb = shuffle(verb);
	console.log("VERB AFTER: ", verb)
	adv = shuffle(adv);
	var patt = new RegExp(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, 'g')

	var verbsToBlank = verb.slice(0, (verb.length)/2 + 1)
	var nounsToBlank = noun.slice(0, (noun.length)/2 + 1)
	var advsToBlank = adv.slice(0, (adv.length)/2 + 1)
	console.log("verbsToBlank: ", verbsToBlank)

	var toMakeBlank = verbsToBlank.concat(nounsToBlank).concat(advsToBlank)
	console.log("toMakeBlank: ", toMakeBlank)
	var madlibTextDisplay = madlibText.slice(0)
	for(var i = 0; i < toMakeBlank.length; i++){
		//if(madlibTextDisplay[toMakeBlank[i]])
		var currWord = madlibTextDisplay[toMakeBlank[i]]
		console.log("char at end: ", currWord.charAt(currWord.length - 1))
		
		madlibTextDisplay[toMakeBlank[i]] = {punc: ''}
		if(patt.test(currWord.charAt(currWord.length - 1))){
			console.log("word ends with punctuation")
			madlibTextDisplay[toMakeBlank[i]].punc = currWord.charAt(currWord.length - 1)
		}
		console.log("madlibTextDisplay: ", madlibTextDisplay)
		madlibText[toMakeBlank[i]] = {}
	}
	return madlibTextDisplay

}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


module.exports={
	organizeAnnotations
}