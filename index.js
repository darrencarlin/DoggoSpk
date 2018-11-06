document.addEventListener("DOMContentLoaded", function(event) {
  const words = {
    help: "halp",
    attention: "attenchon",
    stop: "staph",
    that: "dat",
    thats: "dats",
    this: "dis",
    fuck: "furk",
    some: "sum",
    fuckery: "furkery",
    brother: "brofur",
    brothers: "brofurs",
    sister: "sisfur",
    sisters: "sisfurs",
    parent: "pawrent",
    parents: "pawrents",
    paws: "stumps",
    dog: "doggo",
    more: "moar",
    with: "wid",
    please: "peez",
    scratches: "scritches",
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
    for: "fur",
    loves: "ruffs",
    hi: "hai",
    walk: "walkies",
    train: "tren",
    cheese: "chez",
    afraid: "fraid"
  };

  const inputForm = document.getElementById("inputform");
  const outputForm = document.getElementById("outputform");
  const submitBtn = document.getElementById("submit");
  const addBtn = document.getElementById("addWord");
  const clearBtn = document.getElementById("clear");
  const hashtagBtn = document.getElementById("convertToHash");
  const wordList = document.getElementById("wordlist");

  let entireWordsArr = [];

  // Firebase

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  const wordsRef = db.collection("noTranslation");
  const userWords = db.collection("userWords");

  // Get words

  let wordsArr = [];

  function getWords() {
    console.log("getting words");
    wordsArr = [];
    wordsRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        for (key in data) {
          if (data.hasOwnProperty(key)) {
            let value = data[key];
            entireWordsArr.push(value);
            wordsArr.push({
              name: value,
              id: id
            });
          }
        }
      });
      displayWords(wordsArr);
    });
  }
  getWords();

  // Display words

  function displayWords(arr) {
    wordList.innerHTML = "";
    Array.from(arr).forEach(word => {
      wordList.innerHTML += `<li class="word" id="${word.id}" >${
        word.name
      }</li>`;
    });
  }

  // Add words to Firebase

  function addData(arr) {
    arr = arr.filter(val => !entireWordsArr.includes(val));
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

  function addWordToDB(event) {
    event.preventDefault();
    let english = document.getElementById("english").value.trim();
    let translation = document.getElementById("doggo").value.trim();
    let word = {
      english: english,
      translation: translation
    };
    userWords
      .add({
        word
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    document.getElementById("english").value = "";
    document.getElementById("doggo").value = "";
    document.getElementById("addWord").innerText = "Thank You";
    setTimeout(() => {
      document.getElementById("addWord").innerText = "Submit";
    }, 3000);
  }

  // Convert words to doggo

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
      // if the word doesn't have a translation return the word, else return the translation
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

  // Create hashtags

  function createHashtags(event) {
    event.preventDefault();
    outputForm.innerHTML = "";
    hashtagArr.forEach(word => {
      outputForm.innerHTML += `#${word}`;
    });
  }

  // Add word to input

  document.body.addEventListener("click", event => {
    if (event.srcElement.className == "word") {
      addToInput(event);
    }
  });

  function addToInput(event) {
    document.querySelector("#addForm input:first-of-type").value =
      event.target.innerText;
    console.log(event.target.innerText);
  }

  // Event Handlers

  clearBtn.addEventListener("click", event => {
    event.preventDefault();
    inputForm.value = "";
    outputForm.innerText = "";
    hashtagArr = [];
    noTranslationArr = [];
  });

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

  addBtn.addEventListener("click", event => {
    addWordToDB(event);
  });
});
