document.addEventListener("DOMContentLoaded", function(event) {
  const dictionary = {
    what: ["wut"],
    puppy: ["pupperino"],
    fur: ["floof"],
    help: ["halp"],
    hello: ["herro"],
    lick: ["mlem"],
    fat: ["thicc"],
    treats: ["yum yums"],
    hungry: ["hungo"],
    snack: ["snacc"],
    attention: ["attenchon"],
    stop: ["staph"],
    that: ["dat"],
    thats: ["dats"],
    this: ["dis"],
    fuck: ["furk"],
    some: ["sum"],
    fuckery: ["furkery"],
    brother: ["brofur"],
    brothers: ["brofurs"],
    sister: ["sisfur"],
    sisters: ["sisfurs"],
    parent: ["pawrent"],
    parents: ["pawrents"],
    paws: ["stumps", "toe beans"],
    dog: ["doggo"],
    more: ["moar"],
    with: ["wid"],
    please: ["peez"],
    scratches: ["scritches"],
    look: ["lewk"],
    give: ["gib"],
    teeth: ["teef"],
    think: ["tink"],
    you: ["u"],
    need: ["ned"],
    to: ["2"],
    its: ["is"],
    me: ["ma"],
    friend: ["fren"],
    friends: ["frens"],
    fret: ["fret"],
    doing: ["doin"],
    bark: ["bork"],
    human: ["hooman"],
    for: ["fur"],
    love: ["luv","lub"],
    very: ["heckin"],
    food: ["noms"],
    like: ["liek"],
    nose: ["snoot"],
    legs: ["nubs"],
    run: ["zoom"],
    running: ["zoomies"],
    bird: ["birb"],
    crazy: ["heckin"],
    good: ["da bes"],
    boy: ["boye"],
    cat: ["catto"],
    kitten: ["kitteh"],
    dead: ["ded"],
    have: ["hav"],
    never: ["neber"],
    hated: ["h8d"],
    hate: ["h8"],
    small: ["smol"],
    loves: ["ruffs"],
    hi: ["hai"],
    walk: ["walkies"],
    train: ["tren"],
    cheese: ["chez", "cheeezz"],
    afraid: ["fraid", "fraaaid", "fraaaaiiiddddd"],
    excuse: ["scuse"],
    stupid: ["stoopid"],
    protect: ["protec"],
    there: ["ther"]
  };

  let levelOfDerp = 1;

  const inputForm = document.getElementById("inputform");
  const outputForm = document.getElementById("outputform");
  const submitBtn = document.getElementById("submit");
  const addBtn = document.getElementById("addWord");
  const clearBtn = document.getElementById("clear");
  const hashtagBtn = document.getElementById("convertToHash");
  const wordList = document.getElementById("wordlist");
  const wordCount = document.getElementById("wordCount");

  const libraryCount = document.getElementById("libraryCount");
  const libraryWordCount = Object.keys(dictionary).length;
  libraryCount.innerHTML = libraryWordCount;
  let entireWordsArr = [];

  // Firebase

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  const wordsRef = db.collection("noTranslation");
  const dictionaryRef = db.collection("dictionary");
  const userWords = db.collection("userWords");

  // Get Dictionary from Firestore

  function getDictionary() {}

  // Get words not yet translated from Firestore

  let wordsArr = [];

  function getWords() {
    wordsArr = [];
    wordsRef.get().then(snapshot => {
      wordCount.innerHTML = snapshot.size;
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

  // Display words not yet translated from getWords()

  function displayWords(arr) {
    wordList.innerHTML = "";
    Array.from(arr).forEach(word => {
      wordList.innerHTML += `<li class="word" id="${word.id}" >${
        word.name
      }</li>`;
    });
  }

  // Add words to Firebase that have no translation after being searched

  function addData(arr) {
    arr = arr.filter(val => !entireWordsArr.includes(val));
    var filtered = arr.filter(el => {
      return el != null;
    });
    filtered.forEach(word => {
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

  // Add words to firebase that have been recommended by a user

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

  // Used to store hashtags
  let hashtagArr = [];
  // Words that don't currently have a translation are stored here
  let noTranslationArr = [];

  // Convert words to doggo

  function convertText(event) {
    event.preventDefault();
    let text = inputForm.value.toLowerCase().trim();
    let array = text.split(/,?\s+/);
    array.forEach(word => {
      // if the word doesn't have a translation return the original word, else return the translation
      if (dictionary[word] === undefined) {
        outputForm.innerHTML += `${word} `;
        noTranslationArr.push(word);
      } else {
        let output = dictionary[word][levelOfDerp];
        if (output === undefined) {
          output = dictionary[word][1];
          if (output === undefined) {
            output = dictionary[word][0];
          }
        }
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

  /*****************************************************************************
   *                     Admin Page                                            *
   * ***************************************************************************/
});
