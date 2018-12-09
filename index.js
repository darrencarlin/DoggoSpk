/* global firebase */

document.addEventListener("DOMContentLoaded", function() {
  let levelOfDerp = 0;

  const inputForm = document.getElementById("inputform");
  const outputForm = document.getElementById("outputform");
  const submitBtn = document.getElementById("submit");
  const addBtn = document.getElementById("addWord");
  const clearBtn = document.getElementById("clear");
  const hashtagBtn = document.getElementById("convertToHash");
  const wordList = document.getElementById("wordlist");
  const wordCount = document.getElementById("wordCount");

  const libraryCount = document.getElementById("libraryCount");
  //const libraryWordCount = Object.keys(dictionary).length;
  //libraryCount.innerHTML = libraryWordCount;

  // Firebase

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  const wordsRef = db.collection("noTranslation");

  const userWords = db.collection("userWords");

  let dictionaryObj = {};

  let userWordsArr = [];

  // function testadd() {
  //   const dictionaryRef = db.collection("dictionary");
  //   Object.entries(dictionary).forEach(word => {
  //     //     console.log(

  //     // word[0],
  //     //  [...word[1]]
  //     //     )
  //     dictionaryRef.add({ name: word[0], arr: [...word[1]] });
  //   });
  // }
  // testadd();

  (function getData() {
    (async () => {
      let dictionaryRef = await db.collection("dictionary").get();
      for (let item of dictionaryRef.docs) {
        let data = item.data();
        dictionaryObj[data.name] = data.arr;
      }
      libraryCount.innerHTML = Object.keys(dictionaryObj).length;
    })();

    (async () => {
      let wordsRef = await db.collection("noTranslation").get();
      for (let item of wordsRef.docs) {
        let data = item.data();
        noTranslationArr.push(data.word);
      }
      displayWords(noTranslationArr);
      wordCount.innerHTML = noTranslationArr.length;
    })();

    (async () => {
      let userWordsRef = await db.collection("userWords").get();
      for (let item of userWordsRef.docs) {
        let data = item.data();
        let obj = {
          english: data.english,
          translation: data.translation
        };
        userWordsArr.push(obj);
      }
      document.querySelector(".overlay").remove();
    })();
  })();

  // Display words not yet translated from getWords()

  function displayWords(arr) {
    wordList.innerHTML = "";
    arr.forEach(word => {
      wordList.innerHTML += `<li class="word" >${word}</li>`;
    });
  }

  // Add words to Firebase that have no translation after being searched

  function addData(arr) {
    arr = arr.filter(val => !noTranslationArr.includes(val));
    var filtered = arr.filter(el => {
      return el != null;
    });
    filtered.forEach(word => {
      wordsRef.add({
        word: word
      });
    });
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
    if (english.length && translation.length > 0) {
      userWords.add({
        word
      });

      document.getElementById("english").value = "";
      document.getElementById("doggo").value = "";
      document.getElementById("addWord").innerText = "Thank You";
      setTimeout(() => {
        document.getElementById("addWord").innerText = "Submit";
      }, 3000);
    } else {
      document.getElementById("english").focus();
    }
  }

  // Used to store hashtags
  let hashtagArr = [];
  // Words that don't currently have a translation are stored here
  let noTranslationArr = [];

  // Translate

  function translate(event) {
    event.preventDefault();
    let text = inputForm.value.toLowerCase().trim();
    let array = text.split(/,?\s+/);
    array.forEach(word => {
      // if the word doesn't have a translation return the original word..
      if (dictionaryObj[word] === undefined) {
        outputForm.innerHTML += `${word} `;
        noTranslationArr.push(word);
        // else return the translation
      } else {
        let output = dictionaryObj[word][levelOfDerp];
        if (output === "") {
          output = dictionaryObj[word][1];
          if (output === "") {
            output = dictionaryObj[word][0];
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
      translate(event);
    }
  });

  submitBtn.addEventListener("click", event => {
    translate(event);
  });

  hashtagBtn.addEventListener("click", event => {
    createHashtags(event);
  });

  addBtn.addEventListener("click", event => {
    addWordToDB(event);
  });
});
