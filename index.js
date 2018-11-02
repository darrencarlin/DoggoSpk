const words = {
  help: "halp",
  attention: "attenchon",
  stop: "staph",
  that: "dat",
  thats: "dats",
  this: "dis",
  fuck: "furk",
  fuckery: "furkery",
  brother: "brofur",
  brothers: "brofurs",
  sister: "sisfur",
  sisters: "sisfurs",
  parent: "pawrent",
  parents: "pawrents",
  paws: "stumps",
  dog: "doggo",
  with: "wid",
  please: "peez",
  look: "lewk",
  give: "gib",
  teeth: "teef",
  think: "tink",
  you: "u",
  need: "ned",
  to: "2",
  its: "is",
  me: "ma",
  you: "yew",
  friend: "fren",
  friends: "frens",
  fret: "fret",
  doing: "doin",
  human: "hooman",
  for: "fur"
};

const inputForm = document.getElementById("inputform");
const outputForm = document.getElementById("outputform");
const submitBtn = document.getElementById("submit");
const clearBtn = document.getElementById("clear");
const hashtagBtn = document.getElementById("convertToHash");
const wordsList = document.getElementById("wordlist");

// TODO

// regex to remove funny characters such as !?#$%^&*^ only allow letters a-z

// Add firebase to project to store words

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

let wordsArr = [];
const wordsRef = db.collection("words");

function getWords() {
  wordsRef.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const data = doc.data();
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          let value = data[key];
          wordsArr.push(value);
        }
      }
    });
    displayWords(wordsArr);
  });
}

getWords();

function displayWords(arr) {
  Array.from(arr).forEach(word => {
    wordsList.innerHTML += `<li>${word}</li>`;
  });
}

function addData(arr) {
  arr = arr.filter(val => !wordsArr.includes(val));
  arr.forEach(word => {
    wordsRef
      .add({
        word: word
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  });
  getWords();
}

inputForm.addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    convertText(event);
  }
});

submitBtn.addEventListener("click", event => {
  convertText(event);
});

hashtagBtn.addEventListener("click", event => {
  createHashtags(event);
});

// used to store hashtags
let hashtagArr = [];
// words that don't currently have a translation are stored here
let noTranslationArr = [];

function convertText(event) {
  event.preventDefault();
  let text = inputForm.value.toLowerCase().trim();
  let array = text.split(/,?\s+/);

  array.forEach(word => {
    let output = words[word];
    // if the word doesn't have a translation, return the word else return the translation
    if (output === undefined) {
      outputForm.innerHTML += `${word} `;
      noTranslationArr.push(word);
    } else {
      outputForm.innerHTML += `${output} `;
      hashtagArr.push(output);
    }
  });
  addData(noTranslationArr);
}

function createHashtags(event) {
  event.preventDefault();
  outputForm.innerHTML = "";
  hashtagArr.forEach(word => {
    outputForm.innerHTML += `#${word}`;
  });
}

clearBtn.addEventListener("click", event => {
  event.preventDefault();
  inputForm.value = "";
  outputForm.innerText = "";
  hashtagArr = [];
  noTranslationArr = [];
});

// Allowed words (words that dont have a translation)
// If word isnt found, return that word itself
