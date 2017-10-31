// Initialize Firebase
var config = {
  apiKey: "AIzaSyAWaRCqqaD8yFz1LE6GXri38vnPRaNwDME",
  authDomain: "amber-torch-2575.firebaseapp.com",
  databaseURL: "https://amber-torch-2575.firebaseio.com",
  projectId: "amber-torch-2575",
  storageBucket: "amber-torch-2575.appspot.com",
  messagingSenderId: "276067016731"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var form = firebase.database().ref('form');
