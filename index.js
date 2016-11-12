/*
Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
const mime = require('mime');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const projectId = 'madhatterlibs';

// Set up auth
var gcloud = require('google-cloud')({
  keyFilename: 'key.json',
  projectId: projectId
});

var vision = gcloud.vision();
//console.log("VISION: ", vision)
var Language = gcloud.language
console.log("LANGUAGE: ", Language)
const languageClient = Language({
  keyFilename: 'key.json',
  projectId: projectId
});


var app = express();

function handleSubmit(e){
  e.preventDefault();
  console.log("SUBMITTED")
  var document = languageClient.document(inputText);

// Analyze the sentiment of the document.
document.detectSentiment(function(err, sentiment) {
  if (err) {
      console.log(err);
      res.end('Cloud Natural Language Error: Sentiment');
    } else {
      console.log("SENTIMENT: ", sentiment)
    }
  // sentiment = 100 // Large numbers represent more positive sentiments.
});

// Parse the syntax of the document.
document.annotate(function(err, annotations) {
  if (err) {
      console.log(err);
      res.end('Cloud Natural Language Error: Annotate');
    } else {
      console.log("ANNOTATIONS: ", annotations)
      var textToChange = annotations.tokens
      var words = [];
      var POS = [];
      textToChange.forEach(function(element){
        words.push(element.text)
        POS.push(element.partOfSpeechTag)
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
    }

  // annotations = {
  //   language: 'en',
  //   sentiment: 100,
  //   entities: {},
  //   sentences: ['Contributions welcome!'],
  //   tokens: [
  //     {
  //       text: 'Contributions',
  //       partOfSpeech: 'Noun (common and proper)',
  //       partOfSpeechTag: 'NOUN'
  //     },
  //     {
  //       text: 'welcome',
  //       partOfSpeech: 'Verb (all tenses and modes)',
  //       partOfSpeechTag: 'VERB'
  //     },
  //     {
  //       text: '!',
  //       partOfSpeech: 'Punctuation',
  //       partOfSpeechTag: 'PUNCT'
  //     }
  //   ]
  // }
});



}

// Simple upload form
var form = '<!DOCTYPE HTML><html><body>' +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
  "<input type='file' name='image'/>" +
  "<input type='submit' /></form>" +
  "<div>" +
        "Analyze" +

        "<form onsumbmit='handleSubmit()'>" +
                "<label>Text to analyze </label>" +
                "<textarea name='inputText' placeholder='test' rows='10' cols='30'/>" +
          "<input type='submit'/></form>" + 
          "</div> " +
  '</body></html>';

app.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
});

// Get the uploaded image
// Image is uploaded to req.file.path
app.post('/upload', upload.single('image'), function(req, res, next) {

  // Choose what the Vision API should detect
  // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  var types = ['labels'];

  // Send the image to the Cloud Vision API
  vision.detect(req.file.path, types, function(err, detections, apiResponse) {
    if (err) {
      console.log(err);
      res.end('Cloud Vision Error');
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('<!DOCTYPE HTML><html><body>');

      // Base64 the image so we can display it on the page
      res.write('<img width=200 src="' + base64Image(req.file.path) + '"><br>');

      // Write out the JSON output of the Vision API
      res.write(JSON.stringify(detections, null, 4));

      // Delete file (optional)
      fs.unlinkSync(req.file.path);

      res.end('</body></html>');
    }
  });
});


app.listen(8080);
console.log('Server Started');

// Turn image into Base64 so we can display it easily

function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}
