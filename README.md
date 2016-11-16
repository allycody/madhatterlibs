# madhatterlibs
Grace Hopper Academy Stackathon

In the api.js file, I authenticate to the google cloud API and watson API.
The file paths to my authentication objects are in my .gitignore file so that my 
credentials wouldn't get uploaded to github.

For watson, you have to go to https://www.ibm.com/watson/developercloud/ and make an account
with Bluemix. You get a free trial to use the APIs, from what I remember, they provide pretty 
straightforward steps to getting authentication credentials. 

For google cloud and the Natural Language API you can go to the developer console at
https://console.developers.google.com/ and add a project. Go to the credentials page via the 
credentials link in the menu on the left side and select Create Credentials => Service Account Key 
and download it. 

From the menu at the top, make sure you are in the correct project and then click Enable API and
in the Google Cloud category select Google Cloud Natural Language API.

Make sure to change the file paths in my code to wherever your credentials are stored on your
computer!


