// Select and replace word helpers

function organizeAnnotations(annotations){
	var textToChange = annotations.tokens
    var words = [];
    var POS = [];
    var labels = [];
    var entities = annotations.entities;
    var POSindexes = {};
    var punctCount = 0;
    var labelsToIgnore = ['POSS', 'NEG', 'AUX', 'CCOMP', 'ADVMOD']
    var POStoIgnore = ['CONJ', 'PRON']

    // to optimize, try making an entities object that has the entity as the key
    // and type as the val, then you can easily look up if a word is an entity and
    // make changes the first time through
    textToChange.forEach(function(element, idx){
    	var word = element.text.content;
    	var POStag = element.partOfSpeech.tag;
    	var label = element.dependencyEdge.label
    	var labelsToIgnore = ['POSS', 'NEG', 'AUX', 'CCOMP', 'ADVMOD']
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
		    		POSindexes[element.partOfSpeech.tag].push(idx - punctCount)
		    	}
		    	else{
		    		POSindexes[element.partOfSpeech.tag] = [idx - punctCount]
		    	}
		}}
    })

    var newData = replaceEntities(words, POS, labels, entities)
    ({words, POS, labels} = newData)



    for(var i = 0; i < words.length; i++){

    }
    // MAKE HELPER FUNCTION FOR FIND VERBS, NOUNS, ETC
    // Turn token json into one object with word : POS key/val pairs?
    // make an array that is split by words
    // make an array that has a POS corresponding to each word in the words arr
    // console.log("WORDS: ", words)
    // console.log("POS: ", POS)
    // Make object that for each POS there is a key whose val is an array of idexes 
  
    //console.log("tokens: ", annotations.tokens)
    //console.log("entities: ", entities)
    var madlibText = words.slice(0)
    var results = generateBlanks(madlibText, POSindexes)
    ({numBlanks, madlibTextDisplay} = results)
    madlibText = madlibTextDisplay;
    // if (numBlanks === 0){
    // 	return new Error("Your text was not long enough or you gave us terrible, no good words")
    // }
    // console.log("madlibText: ", madlibText)
    // console.log("words array: ", words)
    return {words, POS, labels, entities, madlibText, numBlanks}
}

// ********************************************

function generateBlanks(madlibText, POSindexes){
	//console.log("POSindexes objext: ", POSindexes)
	//{NOUN, VERB, ADV} = POSindexes;
	var noun = POSindexes.NOUN ? POSindexes.NOUN : []
	var verb = POSindexes.VERB ? POSindexes.VERB : []
	var adv = POSindexes.ADV ? POSindexes.ADV : []
	var num = POSindexes.NUM ? POSindexes.NUM : []

	//console.log("VERB BEFORE: ", verb)

	noun = shuffle(noun);
	verb = shuffle(verb);
	adv = shuffle(adv);
	num = shuffle(num)
	
	var patt = new RegExp(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, 'g')

	var verbsToBlank = verb.slice(0, (verb.length)/5)
	var nounsToBlank = noun.slice(0, (noun.length)/5)
	var advsToBlank = adv.slice(0, (adv.length)/5)
	var numsToBlank = num.slice(0, 1)

	//console.log("verbsToBlank: ", verbsToBlank)

	var toMakeBlank = verbsToBlank.concat(nounsToBlank).concat(advsToBlank).concat(numsToBlank)
	//console.log("toMakeBlank: ", toMakeBlank)
	var madlibTextDisplay = madlibText.slice(0)


	for(var i = 0; i < toMakeBlank.length; i++){
		//if(madlibTextDisplay[toMakeBlank[i]])
		var currWord = madlibTextDisplay[toMakeBlank[i]]
		//console.log("char at end: ", currWord.charAt(currWord.length - 1))
		
		madlibTextDisplay[toMakeBlank[i]] = {punc: ''}
		if(patt.test(currWord.charAt(currWord.length - 1))){
			//console.log("word ends with punctuation")
			madlibTextDisplay[toMakeBlank[i]].punc = currWord.charAt(currWord.length - 1)
		}
		//console.log("madlibTextDisplay: ", madlibTextDisplay)
		//madlibText[toMakeBlank[i]] = {}
	}
	//console.log("toMakeBlank.length: ", toMakeBlank.length)
	return {madlibTextDisplay, numBlanks: toMakeBlank.length}

}

// ***********************************************

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

function replaceEntities(words, POS, labels, entities){
	var entityType = ['people', 'places', 'goods', 'organizations']
	var entitiesArr = []

	for(var i = 0; i < entityType.length; i++){
		//console.log("entityType : ", entityType[i])
		//console.log("entityType in entity: ", entities[entityType[i]])
		if(entities[entityType[i]]){
			entitiesArr = entitiesArr.concat(entities[entityType[i]])
		}
	}
	console.log("ENTITIES ARRAY: ", entitiesArr)

	// for each entity find its length
	for(var i = 0; i < entitiesArr.length; i++){
		var entityName = entitiesArr[i].name;
		var entityLength = entityName.split(" ").length;
		var entityType = entitiesArr[i].type
		var entityIndex = findEntity(entityName, words)
		console.log("ENTITY INDEX: ", entityIndex)
		words = words.slice(0, entityIndex).concat([words.slice(entityIndex, entityIndex + entityLength).join(" ")]).concat(words.slice(entityIndex + entityLength))
		labels = labels.slice(0, entityIndex).concat([entityType]).concat(labels.slice(entityIndex + entityLength))
		POS = POS.slice(0, entityIndex).concat(['NOUN']).concat(POS.slice(entityIndex + entityLength))
	
		console.log("LENGTHS: ", words.length, labels.length, POS.length)
	}

	return {words, POS, labels}

}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}

function findEntity(needle, haystack) {
	console.log(needle)
	needle = needle.split(" ")
	var patt = new RegExp(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, 'g')
	var lastWord = needle[needle.length - 1]
	console.log("lastWord: ", lastWord)
	if(patt.test(lastWord.charAt(lastWord.length - 1))){
		console.log("found punctuation")
		needle[needle.length - 1] = lastWord.slice(0, -1)
	}
	console.log(needle)
	if(needle.compare(haystack)) return 0; 
	else if(needle.length > haystack.length) return -1;
	
	else {
		for(var i = 0; i <= haystack.length - needle.length; i++) {
			var slice = (haystack.slice(i, i+needle.length ))
			if(needle.compare(slice)) return i;	
			if(patt.test(slice[slice.length - 1].charAt(slice[slice.length - 1].length - 1))){
				console.log("TRUE PUNCTUATION")
				slice[slice.length - 1] = slice[slice.length - 1].slice(0, -1)
				if(needle.compare(slice)) return i;	
			}

		}


	}
	return -1;
}


module.exports={
	organizeAnnotations
}